import { validate } from "com";
import { User, Van } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import { PopulatedReview, ReturnedSanitizedReviews } from "./types";
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

    return {
      reviews: reviews,
      averageRating: averageRating,
    };
  })();
};
