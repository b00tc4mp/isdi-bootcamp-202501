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
describe("getVanById", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([
            data_1.Van.deleteMany({}),
            data_1.Trip.deleteMany({}),
            data_1.User.deleteMany({}),
            data_1.Location.deleteMany({}),
            data_1.Review.deleteMany({}),
        ]);
    });
    it("returns full van info with features, traits, rating and occupiedDates", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
        });
        const review = yield data_1.Review.create({
            rating: 4,
            comment: "Molt bé",
            author: user._id,
        });
        const trip = yield data_1.Trip.create({
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-06-03"),
            renter: user._id,
            van: new mongoose_1.Types.ObjectId(), // actualitzat després
            paymentMethod: "currency",
            confirmStatus: "accepted",
            paymentStatus: "payed",
        });
        const van = yield data_1.Van.create({
            model: "Transporter",
            brand: "VW",
            location: location._id,
            owner: user._id,
            price: 300,
            accessible: true,
            windows: 3,
            doors: 2,
            bedCount: 2,
            fuelType: "diesel",
            storage: 70,
            heating: true,
            airConditioning: false,
            insideKitchen: true,
            toilet: "fixed",
            shower: true,
            maxTravellers: 4,
            trips: [trip._id],
            reviews: [review._id],
            images: [],
        });
        yield data_1.Trip.findByIdAndUpdate(trip._id, { van: van._id });
        const result = yield (0, index_1.getVanById)(van._id.toString());
        (0, chai_1.expect)(result).to.have.property("id", van._id.toString());
        (0, chai_1.expect)(result.vehicleTraits).to.deep.equal({
            accessible: true,
            doors: 2,
            bedCount: 2,
            storage: 70,
            fuelType: "diesel",
            windows: 3,
            maxTravellers: 4,
        });
        (0, chai_1.expect)(result.features).to.deep.equal({
            heating: true,
            shower: true,
            airConditioning: false,
            insideKitchen: true,
            toilet: "fixed",
        });
        (0, chai_1.expect)(result.averageRating).to.equal(4);
        (0, chai_1.expect)(result.occupiedDates).to.be.an("array").with.lengthOf(3);
    }));
    it("returns van with empty reviews and trips", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Anna",
            lastName: "Puig",
            email: "anna@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const location = yield data_1.Location.create({
            city: "Girona",
            country: "Spain",
        });
        const van = yield data_1.Van.create({
            model: "Solo",
            brand: "Ford",
            location: location._id,
            owner: user._id,
            price: 250,
            accessible: false,
            windows: 2,
            doors: 4,
            bedCount: 1,
            fuelType: "petrol",
            storage: 50,
            heating: false,
            airConditioning: true,
            insideKitchen: false,
            toilet: "none",
            shower: false,
            maxTravellers: 2,
            trips: [],
            reviews: [],
            images: [],
        });
        const result = yield (0, index_1.getVanById)(van._id.toString());
        (0, chai_1.expect)(result).to.have.property("averageRating", null);
        (0, chai_1.expect)(result.occupiedDates).to.have.lengthOf(0);
        (0, chai_1.expect)(result.features.toilet).to.equal("none");
    }));
    it("throws ValidationError if id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_1.getVanById)("invalid-id");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("invalid");
        }
    }));
    it("throws SystemError if DB fails during van fetch", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.Van.findById;
        data_1.Van.findById = () => ({
            populate: () => ({
                select: () => ({
                    lean: () => {
                        throw new Error("Simulated DB failure");
                    },
                }),
            }),
        });
        try {
            yield (0, index_1.getVanById)(new mongoose_1.Types.ObjectId().toString());
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.include("Simulated DB failure");
        }
        finally {
            data_1.Van.findById = original;
        }
    }));
    it("throws NotFoundError if van is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeId = new mongoose_1.Types.ObjectId();
        try {
            (0, index_1.getVanById)(fakeId.toString());
        }
        catch (error) {
            (0, chai_1.expect)(error).to.be.instanceof(errors_1.NotFoundError);
            (0, chai_1.expect)(error.message).to.equal("van not found");
        }
    }));
    it("throws SystemError if reviews mapping fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Test",
            lastName: "Broken",
            email: "fail@test.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const location = yield data_1.Location.create({
            city: "Fake",
            country: "Nowhere",
        });
        const review = yield data_1.Review.create({
            rating: 4,
            comment: "Bad author",
            author: user._id,
        });
        const van = yield data_1.Van.create({
            model: "BrokenVan",
            brand: "Fail",
            owner: user._id,
            location: location._id,
            price: 100,
            reviews: [review._id],
            trips: [],
            windows: 1,
            doors: 1,
            bedCount: 1,
            fuelType: "diesel",
            storage: 10,
            heating: false,
            airConditioning: false,
            insideKitchen: false,
            toilet: "none",
            shower: false,
            maxTravellers: 2,
        });
        // Sobreescrivim autor malament
        yield data_1.Review.updateOne({ _id: review._id }, { author: null });
        try {
            yield (0, index_1.getVanById)(van._id.toString());
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(TypeError);
        }
    }));
    it("handles trip with invalid date range", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "BadTrip",
            email: "bad@trip.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const location = yield data_1.Location.create({
            city: "ErrorCity",
            country: "XXXX",
        });
        const trip = yield data_1.Trip.create({
            startDate: new Date("2025-06-10"),
            endDate: new Date("2025-06-01"), // Dates a l'inrevés
            renter: user._id,
            van: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "NoDatesVan",
            brand: "ErrorBrand",
            owner: user._id,
            location: location._id,
            price: 100,
            trips: [trip._id],
            reviews: [],
            windows: 1,
            doors: 1,
            bedCount: 1,
            fuelType: "diesel",
            storage: 10,
            heating: false,
            airConditioning: false,
            insideKitchen: false,
            toilet: "none",
            shower: false,
            maxTravellers: 2,
        });
        yield data_1.Trip.findByIdAndUpdate(trip._id, { van: van._id });
        const result = yield (0, index_1.getVanById)(van._id.toString());
        (0, chai_1.expect)(result.occupiedDates).to.have.lengthOf(0); // no ha d'afegir cap data
    }));
    it("sets default comment and rating if missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "NoComment",
            email: "no@c.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const location = yield data_1.Location.create({ city: "XXXX", country: "YYYY" });
        const review = yield data_1.Review.create({
            author: user._id,
            comment: undefined, // <- força el cas de fallback
        });
        const van = yield data_1.Van.create({
            model: "TestVan",
            brand: "Test",
            owner: user._id,
            location: location._id,
            price: 123,
            reviews: [review._id],
            trips: [],
            windows: 1,
            doors: 1,
            bedCount: 1,
            fuelType: "diesel",
            storage: 10,
            heating: false,
            airConditioning: false,
            insideKitchen: false,
            toilet: "none",
            shower: false,
            maxTravellers: 1,
        });
        const result = yield (0, index_1.getVanById)(van._id.toString());
        (0, chai_1.expect)(result.averageRating).to.equal(null); // perquè no hi ha rating
        (0, chai_1.expect)(result).to.have.nested.property("features.toilet", "none");
    }));
    afterEach(() => {
        return Promise.all([
            data_1.Van.deleteMany({}),
            data_1.Trip.deleteMany({}),
            data_1.User.deleteMany({}),
            data_1.Location.deleteMany({}),
            data_1.Review.deleteMany({}),
        ]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
