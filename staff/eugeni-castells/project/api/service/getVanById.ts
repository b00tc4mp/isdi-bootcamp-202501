import { validate } from "com";
import { PopulatedReview, VanDetailInfo, PopulatedTrip } from "./types";
import { getAverageRating } from "../utils";
import { Van } from "../data";
import { SystemError } from "com/errors";

export const getVanById = (id: string): Promise<VanDetailInfo> => {
  validate.id(id, "van id");

  return Van.findById(id)
    .populate<{
      location: { city: string; country: string };
      owner: {
        name: string;
        lastName: string;
      };
      trips: PopulatedTrip[];
      reviewsCount: number;
      rating: number;
      reviews: PopulatedReview[];
    }>([
      {
        path: "trips",
        select: "startDate endDate",
      },
      {
        path: "owner",
        select: "name lastName",
      },
      {
        path: "location",
        select: "address country city",
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
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((van) => {
      const {
        _id,
        accessible,
        doors,
        toilet,
        shower,
        heating,
        bedCount,
        storage,
        fuelType,
        windows,
        airConditioning,
        insideKitchen,
        maxTravellers,
        ...sanitizedVan
      } = van!;

      const sanitizedId = _id.toString();

      const reviews: PopulatedReview[] = van!.reviews.map((review) => {
        return {
          id: review._id!.toString(),
          comment: review.comment || "",
          rating: review.rating ?? null,
          author: {
            name: review.author.name,
            lastName: review.author.lastName,
          },
        };
      });

      const averageRating = getAverageRating(reviews);

      const occupiedDates: Date[] = [];

      //We add to occupiedDates array every date that has
      van!.trips.forEach((trip) => {
        //we make sure is a date by creating a new date object and we make a copy of the original
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        let current = new Date(start);

        while (current <= end) {
          occupiedDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
      });

      const finalVan: VanDetailInfo = {
        ...sanitizedVan,
        id: sanitizedId,
        vehicleTraits: {
          accessible: accessible,
          doors: doors,
          bedCount: bedCount,
          storage: storage,
          fuelType: fuelType,
          windows: windows,
          maxTravellers: maxTravellers,
        },
        features: {
          heating: heating,
          shower: shower,
          airConditioning: airConditioning,
          insideKitchen: insideKitchen,
          toilet: toilet,
        },
        averageRating,
        occupiedDates,
      };

      return finalVan;
    });
};
