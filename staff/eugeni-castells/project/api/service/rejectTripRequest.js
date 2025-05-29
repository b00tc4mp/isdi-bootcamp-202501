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
exports.rejectTripRequest = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
/*Conditions:
- user exists
-trip exists
- user owns van with this trip
*/
const rejectTripRequest = (userId, tripId) => {
    com_1.validate.id(userId, "user id");
    com_1.validate.id(tripId, "trip id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield data_1.User.findById(userId).lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!user) {
            throw new errors_1.NotFoundError("user not found");
        }
        let trip;
        try {
            trip = yield data_1.Trip.findById(tripId)
                .populate({ path: "van", select: "owner" })
                .lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!trip) {
            throw new errors_1.NotFoundError("trip not found");
        }
        if (trip.van.owner.toString() !== userId) {
            throw new errors_1.OwnershipError("user doesn't own the van associated to the trip");
        }
        try {
            const result = yield data_1.Trip.deleteOne({ _id: tripId });
            if (result.deletedCount === 0) {
                throw new errors_1.NotFoundError("trip not found during deletion");
            }
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
    }))();
};
exports.rejectTripRequest = rejectTripRequest;
