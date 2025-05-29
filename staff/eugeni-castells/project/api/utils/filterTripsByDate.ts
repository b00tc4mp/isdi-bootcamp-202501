import { VanWithPopulatedTrips } from "../service/types";

//We are restricting the generic to have, minimum, the property trips as an array of PopulatedTrip since its the only thing that matters when it comes to filter for trip.dates
export const filterTripsByDate = <T extends VanWithPopulatedTrips>(
  vans: T[],
  startDate: Date,
  endDate: Date
): T[] => {
  return vans.filter((van) => {
    //Overlap condition trip.startDate <= endDate && trip.endDate >= startDate
    const hasOverlap = van.trips.some((trip) => {
      return trip.startDate <= endDate && trip.endDate >= startDate;
    });

    // Només retornem les vans que no tinguin solapament
    return !hasOverlap;
  });
};
