import { validate } from "com";
import {
  PopulatedReview,
  VanDetailInfo,
  PopulatedTrip,
  SanitizedReview,
} from "./types";
import { getAverageRating } from "../utils";
import { Van } from "../data";
import { SystemError, NotFoundError } from "com/errors";

export const getVanById = async (id: string): Promise<VanDetailInfo> => {
  validate.id(id, "van id");

  let van;
  try {
    van = await Van.findById(id)
      .populate<{
        location: { city: string; country: string };
        owner: { name: string; lastName: string };
        trips: PopulatedTrip[];
        reviewsCount: number;
        rating: number;
        reviews: PopulatedReview[];
      }>([
        { path: "trips", select: "startDate endDate" },
        { path: "owner", select: "name lastName" },
        { path: "location", select: "address country city" },
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
      .lean();
  } catch (error) {
    throw new SystemError((error as Error).message);
  }

  if (!van) {
    throw new NotFoundError("van not found");
  }

  let reviews: SanitizedReview[] = van.reviews.map((review) => {
    const { _id, comment, rating, author } = review;
    const { _id: authorId, name, lastName } = author;

    return {
      id: _id!.toString(),
      comment: comment || "",
      rating: rating ?? null,
      author: {
        id: authorId.toString(),
        name,
        lastName,
      },
    };
  });

  let averageRating: number | null;
  try {
    averageRating = getAverageRating(reviews);
  } catch (error) {
    throw new SystemError("error calculating average rating");
  }

  const occupiedDates: Date[] = [];
  try {
    for (const trip of van.trips) {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      let current = new Date(start);

      while (current <= end) {
        occupiedDates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    }
  } catch (error) {
    throw new SystemError("error processing occupied dates");
  }

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
  } = van;

  return {
    ...sanitizedVan,
    id: _id.toString(),
    vehicleTraits: {
      accessible,
      doors,
      bedCount,
      storage,
      fuelType,
      windows,
      maxTravellers,
    },
    features: {
      heating,
      shower,
      airConditioning,
      insideKitchen,
      toilet,
    },
    averageRating,
    occupiedDates,
  };
};
