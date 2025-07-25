import { validate } from "com";
import { User, Van, Location } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import {
  SanitizedVanWithRating,
  PopulatedLocation,
  PopulatedTrip,
  PopulatedReview,
  GetVansDateFilterPropsType,
  SanitizedReview,
} from "./types";
import { getAverageRating, filterTripsByDate } from "../utils";

export const getVans = (
  userId: string,
  filterLocation: [number, number] | [null, null],
  filterDates?: GetVansDateFilterPropsType | null
): Promise<SanitizedVanWithRating[]> => {
  validate.id(userId, "user id");

  return (async () => {
    let location;
    let returnedUser;
    let nearbyLocations;
    let vans;
    let filteredVansByDate;

    try {
      //First of all we check if the user who makes the request exists
      returnedUser = await User.findById(userId).lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!returnedUser) throw new NotFoundError("user not found");

    //If the location wasnt sent on the front, we will use the location of the user
    if (!filterLocation[0] || !filterLocation[1]) {
      try {
        location = await Location.findById(returnedUser.location._id).lean();
      } catch (error) {
        throw new SystemError((error as Error).message);
      }
      if (!location) throw new NotFoundError("user location not found");
      if (!location.point?.coordinates)
        throw new NotFoundError("user location coordinates missing");
      //we transform the location received in the same type as the paramether
      location = [location.point.coordinates[0], location.point.coordinates[1]];
    } else {
      //if the location is sent we set the location to the location sent
      location = filterLocation;
    }

    try {
      nearbyLocations = await Location.find({
        point: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: location!,
            },
            $maxDistance: 50 * 1000,
          },
        },
      }).select("_id");
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    //locationIds that match the condition
    const locationIds = nearbyLocations.map((location) => location._id);
    try {
      //get the vans that have the id in their location array
      vans = await Van.find({
        location: { $in: locationIds },
      })
        .populate<{
          location: PopulatedLocation;
          trips: PopulatedTrip[];
          reviews: PopulatedReview[];
        }>([
          {
            path: "location",
            select: "address country city", //només els camps que m'interessen
          },
          {
            path: "trips",
            select: "startDate endDate",
          },
          {
            path: "reviews",
            select: "comment author rating",
            populate: {
              path: "author",
              select: "name lastName",
            },
          },
        ])
        .select("-__v")
        .sort("-createdAt")
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    //We filter the vans that meet the date restriction
    if (filterDates) {
      filteredVansByDate = filterTripsByDate(
        vans,
        filterDates!.start!,
        filterDates!.end!
      );
    }
    //Depending on if we have filterDate or not we will sanitize one group of vans or
    const vansToMap = filterDates ? filteredVansByDate : vans;

    //We will use the filteredVansByDate for the final sanitation
    const finalVans: SanitizedVanWithRating[] = vansToMap!.map((van) => {
      const typedVan = van as unknown as {
        reviews: PopulatedReview[];
      };

      /*com que no podem fer delete perquè el delete s'ha de fer sobre variables que no tinguin el required,
        haurem de desestructurar i deixar 'lliure' les variables que volguem eliminar*/

      const { _id, createdAt, modifiedAt, location, ...sanitizedVan } = van;

      const { _id: locationId, ...restLocation } = location;

      restLocation.id = _id.toString();

      const transformedReviews = typedVan.reviews.map((review) => {
        const { _id, author, ...sanitizedReview } = review;

        const { _id: authorObjectId, ...sanitizedAuthor } = author;

        return {
          ...sanitizedReview,
          id: review._id!.toString(),
          comment: review.comment || "",
          rating: review.rating ?? null,
          author: {
            ...sanitizedAuthor,
            id: _id!.toString(),
          },
        };
      });

      const reviews: SanitizedReview[] = transformedReviews;
      const averageRating = getAverageRating(reviews);

      return {
        ...sanitizedVan,
        location: restLocation,
        id: _id.toString(),
        reviews: reviews,
        averageRating,
        modifiedAt: modifiedAt !== null ? new Date(modifiedAt) : null,
        createdAt: new Date(createdAt),
      };
    });

    return finalVans;
  })();
};
