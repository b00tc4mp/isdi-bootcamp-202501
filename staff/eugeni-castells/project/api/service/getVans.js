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
exports.getVans = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const getAverageRating_1 = require("../utils/getAverageRating");
const getVans = (userId) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const returnedUser = yield data_1.User.findById(userId).lean();
            if (!returnedUser)
                throw new errors_1.NotFoundError("user not found");
            const location = yield data_1.Location.findById(returnedUser.location._id).lean();
            if (!((_a = location === null || location === void 0 ? void 0 : location.point) === null || _a === void 0 ? void 0 : _a.coordinates))
                throw new errors_1.NotFoundError("user location not found or incomplete");
            const nearbyLocations = yield data_1.Location.find({
                point: {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: location.point.coordinates,
                        },
                        $maxDistance: 50 * 1000,
                    },
                },
            }).select("_id");
            const locationIds = nearbyLocations.map((loc) => loc._id);
            const vans = yield data_1.Van.find({
                location: { $in: locationIds },
            })
                .populate([
                {
                    path: "location",
                    select: "address country city", //només els camps que m'interessen
                },
                {
                    path: "reviews",
                    select: "comment author rating",
                    populate: {
                        path: "author",
                        select: "name",
                    },
                },
            ])
                .select("-__v")
                .sort("-createdAt")
                .lean();
            const finalVans = yield Promise.all(vans.map((van) => {
                const typedVan = van;
                /*com que no podem fer delete perquè el delete s'ha de fer sobre variables que no tinguin el required,
              haurem de desestructurar i deixar 'lliure' les variables que volguem eliminar*/
                const { _id } = van, sanitizedVan = __rest(van, ["_id"]);
                const reviews = typedVan.reviews.map((review) => {
                    var _a;
                    return ({
                        comment: review.comment || "",
                        rating: (_a = review.rating) !== null && _a !== void 0 ? _a : null,
                        author: review.author || "Unknown",
                    });
                });
                const averageRating = (0, getAverageRating_1.getAverageRating)(reviews);
                return Object.assign(Object.assign({}, sanitizedVan), { id: _id.toString(), reviews: reviews, averageRating });
            }));
            return finalVans;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.SystemError(error.message);
        }
    }))();
};
exports.getVans = getVans;
