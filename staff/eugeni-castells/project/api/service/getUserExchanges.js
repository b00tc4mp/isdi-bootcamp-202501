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
exports.getUserExchanges = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const getUserExchanges = (userId) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield data_1.User.findById(userId)
                .populate({
                path: "trips",
                select: "confirmStatus startDate endDate price modifiedAt createdAt renter van",
                populate: [
                    {
                        path: "van",
                        select: "owner",
                        populate: {
                            path: "owner",
                            select: "name lastName",
                        },
                    },
                    {
                        path: "renter",
                        select: "name lastName",
                    },
                ],
                options: { sort: { startDate: 1 } },
            })
                .select("-__v")
                .lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!user) {
            throw new errors_1.NotFoundError("user not found");
        }
        const sanitizedTrips = user.trips.map((trip) => {
            const { _id, van, renter } = trip, rest = __rest(trip, ["_id", "van", "renter"]);
            const { owner } = van;
            const { _id: ownerObjectId } = owner, ownerRest = __rest(owner, ["_id"]);
            const { _id: renterObjectId } = renter, renterRest = __rest(renter, ["_id"]);
            return Object.assign(Object.assign({}, rest), { id: _id.toString(), owner: Object.assign(Object.assign({}, ownerRest), { id: ownerObjectId.toString(), isUser: ownerObjectId.toString() === userId }), renter: Object.assign(Object.assign({}, renterRest), { id: renterObjectId.toString() }) });
        });
        //we make a filter instead of a map because if the condition is not matched the map method will return a null/undefined
        const returnedAllUserTrips = sanitizedTrips.filter((trip) => {
            if (trip.confirmStatus === "accepted") {
                return trip;
            }
        });
        const returnedUserTrips = returnedAllUserTrips.filter((trip) => {
            if (trip.owner.id !== userId) {
                return trip;
            }
        });
        const returnedUserVanTrips = returnedAllUserTrips.filter((trip) => {
            if (trip.owner.id === userId) {
                return trip;
            }
        });
        const pendingAllUserRequests = sanitizedTrips.filter((trip) => {
            if (trip.confirmStatus !== "accepted")
                return trip;
        });
        const pendingUserRequests = pendingAllUserRequests.filter((trip) => {
            if (trip.owner.id !== userId)
                return trip;
        });
        const pendingRequestsFromOtherUsers = pendingAllUserRequests.filter((trip) => {
            if (trip.owner.id === userId)
                return trip;
        });
        return {
            trips: {
                all: returnedAllUserTrips,
                user: returnedUserTrips,
                vans: returnedUserVanTrips,
            },
            pendingRequests: {
                all: pendingAllUserRequests,
                user: pendingUserRequests,
                toUser: pendingRequestsFromOtherUsers,
            },
        };
    }))();
};
exports.getUserExchanges = getUserExchanges;
