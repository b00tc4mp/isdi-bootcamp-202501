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
const utils_1 = require("../utils");
const getVans = (userId, filterLocation, filterDates) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let location;
        let returnedUser;
        let nearbyLocations;
        let vans;
        let filteredVansByDate;
        try {
            //First of all we check if the user who makes the request exists
            returnedUser = yield data_1.User.findById(userId).lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!returnedUser)
            throw new errors_1.NotFoundError("user not found");
        //If the location wasnt sent on the front, we will use the location of the user
        if (!filterLocation[0] || !filterLocation[1]) {
            try {
                location = yield data_1.Location.findById(returnedUser.location._id).lean();
            }
            catch (error) {
                throw new errors_1.SystemError(error.message);
            }
            if (!location)
                throw new errors_1.NotFoundError("user location not found");
            if (!((_a = location.point) === null || _a === void 0 ? void 0 : _a.coordinates))
                throw new errors_1.NotFoundError("user location coordinates missing");
            //we transform the location received in the same type as the paramether
            location = [location.point.coordinates[0], location.point.coordinates[1]];
        }
        else {
            //if the location is sent we set the location to the location sent
            location = filterLocation;
        }
        try {
            nearbyLocations = yield data_1.Location.find({
                point: {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: location,
                        },
                        $maxDistance: 50 * 1000,
                    },
                },
            }).select("_id");
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        //locationIds that match the condition
        const locationIds = nearbyLocations.map((location) => location._id);
        try {
            //get the vans that have the id in their location array
            vans = yield data_1.Van.find({
                location: { $in: locationIds },
            })
                .populate([
                {
                    path: "location",
                    select: "address country city", //només els camps que m'interessen
                },
                {
                    path: "trips",
                    select: "startDate endDate",
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
                .sort("-createdAt")
                .lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        //We filter the vans that meet the date restriction
        if (filterDates) {
            filteredVansByDate = (0, utils_1.filterTripsByDate)(vans, filterDates.start, filterDates.end);
        }
        //Depending on if we have filterDate or not we will sanitize one group of vans or
        const vansToMap = filterDates ? filteredVansByDate : vans;
        //We will use the filteredVansByDate for the final sanitation
        const finalVans = vansToMap.map((van) => {
            const typedVan = van;
            /*com que no podem fer delete perquè el delete s'ha de fer sobre variables que no tinguin el required,
              haurem de desestructurar i deixar 'lliure' les variables que volguem eliminar*/
            const { _id, createdAt, modifiedAt, location } = van, sanitizedVan = __rest(van, ["_id", "createdAt", "modifiedAt", "location"]);
            const { _id: locationId } = location, restLocation = __rest(location, ["_id"]);
            restLocation.id = _id.toString();
            const transformedReviews = typedVan.reviews.map((review) => {
                var _a;
                const { _id, author } = review, sanitizedReview = __rest(review, ["_id", "author"]);
                const { _id: authorObjectId } = author, sanitizedAuthor = __rest(author, ["_id"]);
                return Object.assign(Object.assign({}, sanitizedReview), { id: review._id.toString(), comment: review.comment || "", rating: (_a = review.rating) !== null && _a !== void 0 ? _a : null, author: Object.assign(Object.assign({}, sanitizedAuthor), { id: _id.toString() }) });
            });
            const reviews = transformedReviews;
            const averageRating = (0, utils_1.getAverageRating)(reviews);
            return Object.assign(Object.assign({}, sanitizedVan), { location: restLocation, id: _id.toString(), reviews: reviews, averageRating, modifiedAt: modifiedAt !== null ? new Date(modifiedAt) : null, createdAt: new Date(createdAt) });
        });
        return finalVans;
    }))();
};
exports.getVans = getVans;
