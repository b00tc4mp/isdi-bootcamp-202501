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
require("dotenv/config");
const chai_1 = require("chai");
const mongoose_1 = require("mongoose");
const data_1 = require("../data");
const index_1 = require("./index");
const errors_1 = require("com/errors");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe("rejectTripRequest", () => {
    before(() => data_1.data.connect(MONGO_URI, MONGO_DB_TEST));
    beforeEach(() => Promise.all([
        data_1.User.deleteMany({}),
        data_1.Trip.deleteMany({}),
        data_1.Van.deleteMany({}),
        data_1.Location.deleteMany({}),
    ]));
    it("successfully deletes a trip if user is owner", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Gran Via",
        });
        const owner = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123456",
            location: location._id,
        });
        const renter = yield data_1.User.create({
            name: "Renter",
            lastName: "User",
            email: "renter@test.com",
            password: "123456",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "T5",
            brand: "VW",
            location: location._id,
            owner: owner._id,
            windows: 4,
            doors: 3,
            bedCount: 2,
            fuelType: "diesel",
        });
        const trip = yield data_1.Trip.create({
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-06-10"),
            van: van._id,
            renter: renter._id,
        });
        yield (0, index_1.rejectTripRequest)(owner._id.toString(), trip._id.toString());
        const foundTrip = yield data_1.Trip.findById(trip._id);
        (0, chai_1.expect)(foundTrip).to.be.null;
    }));
    it("throws NotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        const fakeTripId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.rejectTripRequest)(fakeUserId, fakeTripId);
            throw new Error("Expected to throw NotFoundError");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
        }
    }));
    it("throws NotFoundError if trip does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Gran Via",
        });
        const owner = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123456",
            location: location._id,
        });
        const fakeTripId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.rejectTripRequest)(owner._id.toString(), fakeTripId);
            throw new Error("Expected to throw NotFoundError");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
        }
    }));
    it("throws OwnershipError if user does not own the van", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Gran Via",
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            lastName: "User",
            email: "owner@test.com",
            password: "123456",
            location: location._id,
        });
        const renter = yield data_1.User.create({
            name: "Renter",
            lastName: "User",
            email: "renter@test.com",
            password: "123456",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "T5",
            brand: "VW",
            location: location._id,
            owner: renter._id,
            windows: 4,
            doors: 3,
            bedCount: 2,
            fuelType: "diesel",
        });
        const trip = yield data_1.Trip.create({
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-06-10"),
            van: van._id,
            renter: renter._id,
        });
        try {
            yield (0, index_1.rejectTripRequest)(owner._id.toString(), trip._id.toString());
            throw new Error("Expected to throw OwnershipError");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.OwnershipError);
        }
    }));
    afterEach(() => Promise.all([
        data_1.User.deleteMany({}),
        data_1.Trip.deleteMany({}),
        data_1.Van.deleteMany({}),
        data_1.Location.deleteMany({}),
    ]));
    after(() => data_1.data.disconnect());
});
