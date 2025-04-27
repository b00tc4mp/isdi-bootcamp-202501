"use strict";
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
const getVanById = (id) => {
    com_1.validate.id(id, "van id");
    return data_1.Van.findById(id)
        .populate([
        {
            path: "trips",
            select: "startDate endDate",
        },
        {
            path: "owner",
            select: "name lastName",
        },
        {
            path: "location",
            select: "address country city",
        },
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
        .lean()
        .catch((error) => {
        throw new errors_1.SystemError(error.message);
    })
        .then((van) => {
        const _a = van, { _id, accessible, doors, toilet, shower, heating, bedCount, storage, fuelType, windows, airConditioning, insideKitchen, maxTravellers } = _a, sanitizedVan = __rest(_a, ["_id", "accessible", "doors", "toilet", "shower", "heating", "bedCount", "storage", "fuelType", "windows", "airConditioning", "insideKitchen", "maxTravellers"]);
        const sanitizedId = _id.toString();
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
        //Hem d'utilitzar un predicat per dir-li a typescript que després del filtrat
        //el tipus retornat de l'element de l'array serà un tipus en concret i no undefined (ja que és el que haurem filtrat)
        const finalVan = Object.assign(Object.assign({}, sanitizedVan), { id: sanitizedId, vehicleTraits: {
                accessible: accessible,
                doors: doors,
                bedCount: bedCount,
                storage: storage,
                fuelType: fuelType,
                windows: windows,
                maxTravellers: maxTravellers,
            }, features: {
                heating: heating,
                shower: shower,
                airConditioning: airConditioning,
                insideKitchen: insideKitchen,
            }, averageRating });
        return finalVan;
    });
};
exports.getVanById = getVanById;
