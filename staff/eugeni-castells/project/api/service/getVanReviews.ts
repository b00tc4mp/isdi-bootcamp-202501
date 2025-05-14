import { validate } from "com";
import { User, Van } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import {
  PopulatedReview,
  ReturnedSanitizedReviews,
  SanitizedReview,
} from "./types";
import { getAverageRating } from "../utils";

export const getVanReviews = (
  userId: string,
  vanId: string
): Promise<ReturnedSanitizedReviews> => {
  validate.id(userId, "user id");
  validate.id(vanId, "van id");

  return (async () => {
    let user;
    try {
      user = await User.findById(userId);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    let van;
    try {
      van = await Van.findById(vanId)
        .populate<{ reviews: PopulatedReview[] }>({
          path: "reviews",
          select: "comment author rating",
          populate: {
            path: "author",
            select: "name lastName",
          },
        })
        .select("-__v")
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!van) {
      throw new NotFoundError("van not found");
    }

    const reviews: SanitizedReview[] = van.reviews.map((review: any) => {
      const { _id, comment, rating, author } = review;
      const { _id: authorId, name, lastName } = author;

      return {
        id: _id.toString(),
        comment: comment || "",
        rating: rating ?? null,
        author: {
          id: authorId.toString(),
          name,
          lastName,
        },
      };
    });
    const averageRating = getAverageRating(reviews);

    return {
      reviews: reviews,
      averageRating: averageRating,
    };
  })();
};
