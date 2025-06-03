"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTripsByDate = void 0;
//We are restricting the generic to have, minimum, the property trips as an array of PopulatedTrip since its the only thing that matters when it comes to filter for trip.dates
const filterTripsByDate = (vans, startDate, endDate) => {
    return vans.filter((van) => {
        //Overlap condition trip.startDate <= endDate && trip.endDate >= startDate
        const hasOverlap = van.trips.some((trip) => {
            return trip.startDate <= endDate && trip.endDate >= startDate;
        });
        // Només retornem les vans que no tinguin solapament
        return !hasOverlap;
    });
};
exports.filterTripsByDate = filterTripsByDate;
