import { PopulatedReview, SanitizedReview } from "../service/types";

export const getAverageRating = (reviews: SanitizedReview[]): number | null => {
  const validRatings = reviews
    .map((r) => r.rating)
    .filter((r): r is number => typeof r === "number");

  if (!validRatings.length) return null;

  const sum = validRatings.reduce((acc, val) => acc + val, 0);
  const average = sum / validRatings.length;

  return Math.floor(average * 10) / 10;
};
