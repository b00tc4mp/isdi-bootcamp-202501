import { ReturnedPopulatedVan } from "../service/types";

export const filterVansByDate = (
  vans: ReturnedPopulatedVan[],
  startDate: Date,
  endDate: Date
): ReturnedPopulatedVan[] => {
  return vans.filter((van) => {
    //Overlap condition trip.startDate <= endDate && trip.endDate >= startDate
    const hasOverlap = van.trips.some((trip) => {
      return trip.startDate <= endDate && trip.endDate >= startDate;
    });

    // Només retornem les vans que no tinguin solapament
    return !hasOverlap;
  });
};
