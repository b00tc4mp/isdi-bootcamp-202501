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
describe("generateTripRequest", () => {
    before(() => data_1.data.connect(MONGO_URI, MONGO_DB_TEST));
    beforeEach(() => Promise.all([
        data_1.User.deleteMany({}),
        data_1.Van.deleteMany({}),
        data_1.Trip.deleteMany({}),
        data_1.Location.deleteMany({}),
    ]));
    it("creates a trip if all conditions are met", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
        });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@test.com",
            password: "123",
            location: location._id,
            trips: [],
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "owner@test.com",
            password: "123",
            location: location._id,
            trips: [],
        });
        const van = yield data_1.Van.create({
            brand: "VW",
            model: "T5",
            location: location._id,
            owner: owner._id,
            trips: [],
            bedCount: 2,
            doors: 2,
            fuelType: "diesel",
            windows: 3,
        });
        const tripParams = {
            selectedDates: {
                startDate: new Date("2025-06-01"),
                endDate: new Date("2025-06-03"),
            },
            totalPrice: 300,
        };
        yield (0, index_1.generateTripRequest)(user._id.toString(), van._id.toString(), tripParams);
        const trips = yield data_1.Trip.find();
        (0, chai_1.expect)(trips).to.have.lengthOf(1);
        (0, chai_1.expect)(trips[0].price).to.equal(300);
    }));
    it("throws NotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const van = yield data_1.Van.create({
            model: "Test",
            brand: "Brand",
            trips: [],
            bedCount: 2,
            doors: 2,
            fuelType: "diesel",
            windows: 3,
        });
        const fakeUserId = new mongoose_1.Types.ObjectId();
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-01"),
                endDate: new Date("2025-06-03"),
            },
            totalPrice: 100,
        };
        try {
            yield (0, index_1.generateTripRequest)(fakeUserId.toString(), van._id.toString(), params);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        }
    }));
    it("throws NotFoundError if van does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeVanId = new mongoose_1.Types.ObjectId();
        const user = yield data_1.User.create({
            name: "Owner",
            email: "owner@test.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
            trips: [],
        });
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-01"),
                endDate: new Date("2025-06-03"),
            },
            totalPrice: 100,
        };
        try {
            yield (0, index_1.generateTripRequest)(user._id.toString(), fakeVanId.toString(), params);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("van not found");
        }
    }));
    it("throws OverlapError if user already has a trip in the same dates", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({ city: "BCN", country: "Spain" });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@t.com",
            password: "123",
            location: location._id,
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "owner@t.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Van",
            brand: "Brand",
            location: location._id,
            owner: owner._id,
            bedCount: 2,
            doors: 2,
            fuelType: "diesel",
            windows: 3,
        });
        const existingTrip = yield data_1.Trip.create({
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-06-03"),
            renter: user._id,
            van: van._id,
        });
        user.trips.push(existingTrip._id);
        yield user.save();
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-02"),
                endDate: new Date("2025-06-04"),
            },
            totalPrice: 200,
        };
        try {
            yield (0, index_1.generateTripRequest)(user._id.toString(), van._id.toString(), params);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.OverlapError);
            (0, chai_1.expect)(err.message).to.include("you already have a trip");
        }
    }));
    it("throws OverlapError if van already has a trip in the same dates", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({ city: "BCN", country: "Spain" });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@t.com",
            password: "123",
            location: location._id,
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "owner@t.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Van",
            brand: "Brand",
            location: location._id,
            owner: owner._id,
            bedCount: 2,
            doors: 2,
            fuelType: "diesel",
            windows: 3,
        });
        const trip = yield data_1.Trip.create({
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-06-03"),
            renter: user._id,
            van: van._id,
        });
        van.trips.push(trip._id);
        yield van.save();
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-02"),
                endDate: new Date("2025-06-04"),
            },
            totalPrice: 200,
        };
        try {
            yield (0, index_1.generateTripRequest)(user._id.toString(), van._id.toString(), params);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.OverlapError);
            (0, chai_1.expect)(err.message).to.include("van is already booked");
        }
    }));
    it("throws SystemError if Trip.create fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({ city: "BCN", country: "Spain" });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@t.com",
            password: "123",
            location: location._id,
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "owner@t.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Van",
            brand: "Brand",
            location: location._id,
            owner: owner._id,
            bedCount: 2,
            doors: 2,
            fuelType: "diesel",
            windows: 3,
        });
        const original = data_1.Trip.create;
        data_1.Trip.create = () => {
            throw new Error("Simulated error");
        };
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-05"),
                endDate: new Date("2025-06-06"),
            },
            totalPrice: 200,
        };
        try {
            yield (0, index_1.generateTripRequest)(user._id.toString(), van._id.toString(), params);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("SystemError");
        }
        finally {
            data_1.Trip.create = original;
        }
    }));
    it("throws SystemError if Promise.all fails during final updates", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({ city: "BCN", country: "Spain" });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@t.com",
            password: "123",
            location: location._id,
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "owner@t.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Van",
            brand: "Brand",
            location: location._id,
            owner: owner._id,
            bedCount: 2,
            doors: 2,
            fuelType: "diesel",
            windows: 3,
        });
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-10"),
                endDate: new Date("2025-06-12"),
            },
            totalPrice: 200,
        };
        const original = data_1.User.updateOne;
        data_1.User.updateOne = () => {
            throw new Error("Simulated update error");
        };
        try {
            yield (0, index_1.generateTripRequest)(user._id.toString(), van._id.toString(), params);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("SystemError");
        }
        finally {
            data_1.User.updateOne = original;
        }
    }));
    it("throws ValidationError if userId is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeVanId = new mongoose_1.Types.ObjectId().toString();
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-01"),
                endDate: new Date("2025-06-02"),
            },
            totalPrice: 100,
        };
        try {
            yield (0, index_1.generateTripRequest)("invalid-id", fakeVanId, params);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("ValidationError");
            (0, chai_1.expect)(err).to.have.property("name", "ValidationError");
        }
    }));
    it("throws ValidationError if vanId is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "John",
            email: "john@test.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-01"),
                endDate: new Date("2025-06-02"),
            },
            totalPrice: 100,
        };
        try {
            yield (0, index_1.generateTripRequest)(user._id.toString(), "invalid-id", params);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err).to.have.property("name", "ValidationError");
        }
    }));
    it("passes van overlap check if dates do not conflict", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Valencia",
            country: "Spain",
        });
        const user = yield data_1.User.create({
            name: "Client",
            email: "client@t.com",
            password: "123",
            location: location._id,
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "owner@t.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "FreeVan",
            brand: "Renault",
            location: location._id,
            owner: owner._id,
            trips: [],
            bedCount: 2,
            doors: 2,
            fuelType: "diesel",
            windows: 3,
        });
        // Afegim un trip al van, però fora de les dates sol·licitades
        const oldTrip = yield data_1.Trip.create({
            startDate: new Date("2025-05-01"),
            endDate: new Date("2025-05-05"),
            renter: new mongoose_1.Types.ObjectId(),
            van: van._id,
        });
        van.trips.push(oldTrip._id);
        yield van.save();
        const params = {
            selectedDates: {
                startDate: new Date("2025-06-10"),
                endDate: new Date("2025-06-12"),
            },
            totalPrice: 300,
        };
        yield (0, index_1.generateTripRequest)(user._id.toString(), van._id.toString(), params);
        const created = yield data_1.Trip.find({ renter: user._id });
        (0, chai_1.expect)(created).to.have.lengthOf(1);
        (0, chai_1.expect)(created[0].startDate.toISOString()).to.include("2025-06-10");
        (0, chai_1.expect)(created[0].endDate.toISOString()).to.include("2025-06-12");
    }));
    it("throws SystemError if DB fails when fetching user and van", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.User.findById;
        data_1.User.findById = () => {
            throw new Error("DB crash");
        };
        const fakeId = new mongoose_1.Types.ObjectId().toString();
        const params = {
            selectedDates: {
                startDate: new Date(),
                endDate: new Date(),
            },
            totalPrice: 100,
        };
        try {
            yield (0, index_1.generateTripRequest)(fakeId, fakeId, params);
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("SystemError");
        }
        finally {
            data_1.User.findById = original;
        }
    }));
    it("throws ValidationError if selectedDates is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Missing",
            email: "missing@t.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "Model",
            brand: "Brand",
            location: new mongoose_1.Types.ObjectId(),
            owner: user._id,
            bedCount: 2,
            doors: 2,
            fuelType: "diesel",
            windows: 3,
        });
        const badParams = {
            totalPrice: 100,
        };
        try {
            yield (0, index_1.generateTripRequest)(user._id.toString(), van._id.toString(), badParams);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("selectedDates");
        }
    }));
    afterEach(() => Promise.all([
        data_1.User.deleteMany({}),
        data_1.Van.deleteMany({}),
        data_1.Trip.deleteMany({}),
        data_1.Location.deleteMany({}),
    ]));
    after(() => data_1.data.disconnect());
});
