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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVanById = void 0;
const com_1 = require("com");
const utils_1 = require("../utils");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const getVanById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    com_1.validate.id(id, "van id");
    let van;
    try {
        van = yield data_1.Van.findById(id)
            .populate([
            { path: "trips", select: "startDate endDate" },
            { path: "owner", select: "name lastName" },
            { path: "location", select: "address country city" },
            {
                path: "reviews",
                select: "comment author rating",
                populate: {
                    path: "author",
                    select: "name lastName",
                },
            },
        ])
            .select("-__v")
            .lean();
    }
    catch (error) {
        throw new errors_1.SystemError(error.message);
    }
    if (!van) {
        throw new errors_1.NotFoundError("van not found");
    }
    let reviews = van.reviews.map((review) => {
        const { _id, comment, rating, author } = review;
        const { _id: authorId, name, lastName } = author;
        return {
            id: _id.toString(),
            comment: comment || "",
            rating: rating !== null && rating !== void 0 ? rating : null,
            author: {
                id: authorId.toString(),
                name,
                lastName,
            },
        };
    });
    let averageRating;
    try {
        averageRating = (0, utils_1.getAverageRating)(reviews);
    }
    catch (error) {
        throw new errors_1.SystemError("error calculating average rating");
    }
    const occupiedDates = [];
    try {
        for (const trip of van.trips) {
            const start = new Date(trip.startDate);
            const end = new Date(trip.endDate);
            let current = new Date(start);
            while (current <= end) {
                occupiedDates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
        }
    }
    catch (error) {
        throw new errors_1.SystemError("error processing occupied dates");
    }
    const { _id, accessible, doors, toilet, shower, heating, bedCount, storage, fuelType, windows, airConditioning, insideKitchen, maxTravellers } = van, sanitizedVan = __rest(van, ["_id", "accessible", "doors", "toilet", "shower", "heating", "bedCount", "storage", "fuelType", "windows", "airConditioning", "insideKitchen", "maxTravellers"]);
    return Object.assign(Object.assign({}, sanitizedVan), { id: _id.toString(), vehicleTraits: {
            accessible,
            doors,
            bedCount,
            storage,
            fuelType,
            windows,
            maxTravellers,
        }, features: {
            heating,
            shower,
            airConditioning,
            insideKitchen,
            toilet,
        }, averageRating,
        occupiedDates });
});
exports.getVanById = getVanById;
