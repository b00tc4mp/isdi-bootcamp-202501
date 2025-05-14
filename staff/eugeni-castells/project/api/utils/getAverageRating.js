"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRating = void 0;
const getAverageRating = (reviews) => {
    const validRatings = reviews
        .map((r) => r.rating)
        .filter((r) => typeof r === "number");
    if (!validRatings.length)
        return null;
    const sum = validRatings.reduce((acc, val) => acc + val, 0);
    const average = sum / validRatings.length;
    return Math.floor(average * 10) / 10;
};
exports.getAverageRating = getAverageRating;
