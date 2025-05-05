"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVanReviews = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const utils_1 = require("../utils");
const getVanReviews = (userId, vanId) => {
    com_1.validate.id(userId, "user id");
    com_1.validate.id(vanId, "van id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield data_1.User.findById(userId);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!user) {
            throw new errors_1.NotFoundError("user not found");
        }
        let van;
        try {
            van = yield data_1.Van.findById(vanId)
                .populate({
                path: "reviews",
                select: "comment author rating",
                populate: {
                    path: "author",
                    select: "name lastName",
                },
            })
                .select("-__v")
                .lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!van) {
            throw new errors_1.NotFoundError("van not found");
        }
        const reviews = van.reviews.map((review) => {
            var _a;
            return {
                id: review._id.toString(),
                comment: review.comment || "",
                rating: (_a = review.rating) !== null && _a !== void 0 ? _a : null,
                author: {
                    name: review.author.name,
                    lastName: review.author.lastName,
                },
            };
        });
        const averageRating = (0, utils_1.getAverageRating)(reviews);
        return {
            reviews: reviews,
            averageRating: averageRating,
        };
    }))();
};
exports.getVanReviews = getVanReviews;
