import { ReturnedVanReview } from "../service/types";

export const getAverageRating = (reviews: ReturnedVanReview[]): number => {
  let sum = 0;

  reviews.forEach((review) => {
    sum += review.rating;
  });

  const averageRatingWithDecimals = sum / reviews.length;

  return Math.floor(averageRatingWithDecimals * 10) / 10;
};
