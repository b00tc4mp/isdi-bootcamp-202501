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

      //Hem d'utilitzar un predicat per dir-li a typescript que després del filtrat
      //el tipus retornat de l'element de l'array serà un tipus en concret i no undefined (ja que és el que haurem filtrat)

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
        },

        averageRating,
      };

      return finalVan;
    });
};
