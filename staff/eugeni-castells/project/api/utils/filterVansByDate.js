"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterVansByDate = void 0;
const filterVansByDate = (vans, startDate, endDate) => {
    return vans.filter((van) => {
        //Overlap condition trip.startDate <= endDate && trip.endDate >= startDate
        const hasOverlap = van.trips.some((trip) => {
            return trip.startDate <= endDate && trip.endDate >= startDate;
        });
        // Només retornem les vans que no tinguin solapament
        return !hasOverlap;
    });
};
exports.filterVansByDate = filterVansByDate;
