"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRating = void 0;
const getAverageRating = (reviews) => {
    let sum = 0;
    reviews.forEach((review) => {
        sum += review.rating;
    });
    const averageRatingWithDecimals = sum / reviews.length;
    return Math.floor(averageRatingWithDecimals * 10) / 10;
};
exports.getAverageRating = getAverageRating;
