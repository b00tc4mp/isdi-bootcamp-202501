import { validate } from "com";
import { User, Van, Location } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import { SanitizedVanWithRating, ReturnedVanReview } from "./types";
import { getAverageRating } from "../utils/getAverageRating";

export const getVans = (userId: string): Promise<object[]> => {
  validate.id(userId, "user id");

  return (async () => {
    try {
      const returnedUser = await User.findById(userId).lean();

      if (!returnedUser) throw new NotFoundError("user not found");

      const location = await Location.findById(
        returnedUser.location._id
      ).lean();

      if (!location?.point?.coordinates)
        throw new NotFoundError("user location not found or incomplete");

      const nearbyLocations = await Location.find({
        point: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: location.point.coordinates,
            },
            $maxDistance: 50 * 1000,
          },
        },
      }).select("_id");

      const locationIds = nearbyLocations.map((loc) => loc._id);

      const vans = await Van.find({
        location: { $in: locationIds },
      })
        .populate([
          {
            path: "location",
            select: "address country city", //només els camps que m'interessen
          },
          {
            path: "reviews",
            select: "comment author rating",
            populate: {
              path: "author",
              select: "name",
            },
          },
        ])
        .select("-__v")
        .sort("-createdAt")
        .lean();

      const finalVans: SanitizedVanWithRating[] = await Promise.all(
        vans.map((van) => {
          const typedVan = van as unknown as SanitizedVanWithRating;

          /*com que no podem fer delete perquè el delete s'ha de fer sobre variables que no tinguin el required,
        haurem de desestructurar i deixar 'lliure' les variables que volguem eliminar*/

          const { _id, ...sanitizedVan } = van;

          const reviews: ReturnedVanReview[] = typedVan.reviews.map(
            (review) => ({
              comment: review.comment || "",
              rating: review.rating ?? null,
              author: review.author || "Unknown",
            })
          );

          const averageRating = getAverageRating(reviews);

          return {
            ...sanitizedVan,
            id: _id.toString(),
            reviews: reviews,
            averageRating,
          };
        })
      );

      return finalVans;
    } catch (error) {
      console.error(error);
      throw new SystemError((error as Error).message);
    }
  })();
};
