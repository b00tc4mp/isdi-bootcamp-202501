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
exports.generateTripRequest = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const utils_1 = require("../utils");
/*Restrictions:
- User exists
- Van exists
- User have trips on the requested trip dates
- Van have trips on the requested trip date (redundant maybe)
- Van travellers >= tripTravellers
*/
const generateTripRequest = (userId, vanId, tripInfo) => {
    com_1.validate.id(userId, "user id");
    com_1.validate.id(vanId, "van id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        let van;
        const { selectedDates, price } = tripInfo, rest = __rest(tripInfo, ["selectedDates", "price"]);
        const { startDate, endDate } = selectedDates;
        try {
            [user, van] = yield Promise.all([
                data_1.User.findById(userId)
                    .populate({
                    path: "trips",
                    select: "startDate endDate",
                })
                    .lean(),
                data_1.Van.findById(vanId)
                    .populate({
                    path: "trips",
                    select: "startDate endDate",
                })
                    .lean(),
            ]);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        //not found restriction
        if (!user)
            throw new errors_1.NotFoundError("user not found");
        if (!van)
            throw new errors_1.NotFoundError("van not found");
        //This will return true if the filter returns one user (the user) or false if it returns 0 users (the user hasnt pass the filter)
        //We put the user into an array because thats what the function expects
        const noUserOverlap = !!(0, utils_1.filterTripsByDate)([user], startDate, endDate);
        if (!noUserOverlap) {
            throw new errors_1.OverlapError("you already have a trip on these dates!");
        }
        const noVanOverlap = !!(0, utils_1.filterTripsByDate)([van], startDate, endDate);
        if (!noVanOverlap) {
            throw new errors_1.OverlapError("requested van is already booked");
        }
        //TODO
        //validate van travellers vs trip travellers
        let trip;
        //Create trip with all the info
        try {
            trip = yield data_1.Trip.create(Object.assign(Object.assign({}, rest), { price: price, renter: userId, vanOwner: van.owner, startDate: startDate, endDate: endDate, van: van._id }));
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        //insert generated trip into renter and van Owner and van
        try {
            //We update the user and the van trip info by pushing the created trip id to the trips array
            yield Promise.all([
                data_1.User.updateOne({ _id: userId }, { $push: { trips: trip._id } }),
                data_1.Van.updateOne({ _id: vanId }, { $push: { trips: trip._id } }),
            ]);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
    }))();
};
exports.generateTripRequest = generateTripRequest;
