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
const mocha_1 = require("mocha");
const data_1 = require("../data");
const chai_1 = require("chai");
const index_1 = require("./index");
const com_1 = require("com");
const errors_1 = require("com/errors");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
(0, mocha_1.describe)("getVans", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Location.deleteMany({}),
            data_1.Trip.deleteMany({}),
        ]);
    });
    it("succeeds on retrieving vans with no filter", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Centre",
        });
        const vans = yield data_1.Van.create([
            {
                brand: "Toyota",
                model: "NX500",
                fuelType: "diesel",
                toilet: "fixed",
                windows: 3,
                year: "2023",
                bedCount: 2,
                doors: 2,
                location: location._id,
                reviews: [],
                trips: [],
                maxTravellers: 4,
            },
        ]);
        const user = yield data_1.User.create({
            name: "Test",
            lastName: "User",
            email: "test@example.com",
            password: "123123",
            location: location._id,
        });
        const result = yield (0, index_1.getVans)(user._id.toString(), [null, null]);
        (0, chai_1.expect)(result).to.be.an("array").with.lengthOf(1);
        (0, chai_1.expect)(result[0]).to.have.property("model", "NX500");
        (0, chai_1.expect)(result[0]).to.have.property("averageRating", null);
    }));
    it("succeeds on retrieving vans filtered by location", () => __awaiter(void 0, void 0, void 0, function* () {
        const near = yield data_1.Location.create({
            city: "Girona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.82, 41.98] },
            address: "Centre",
        });
        const far = yield data_1.Location.create({
            city: "Madrid",
            country: "Spain",
            point: { type: "Point", coordinates: [-3.7038, 40.4168] },
            address: "Gran Via",
        });
        yield data_1.Van.create([
            {
                brand: "Toyota",
                model: "VM100",
                fuelType: "diesel",
                toilet: "fixed",
                windows: 3,
                year: "2023",
                bedCount: 2,
                doors: 2,
                location: near._id,
                reviews: [],
                trips: [],
                maxTravellers: 3,
            },
            {
                brand: "Renault",
                model: "XP300",
                fuelType: "petrol",
                toilet: "fixed",
                windows: 3,
                year: "2022",
                bedCount: 2,
                doors: 2,
                location: far._id,
                reviews: [],
                trips: [],
                maxTravellers: 3,
            },
        ]);
        const user = yield data_1.User.create({
            name: "Tester",
            lastName: "Map",
            email: "test@map.com",
            password: "123123",
            location: near._id,
        });
        const result = yield (0, index_1.getVans)(user._id.toString(), [2.82, 41.98]);
        (0, chai_1.expect)(result).to.be.an("array").with.lengthOf(1);
        (0, chai_1.expect)(result[0]).to.have.property("model", "VM100");
        (0, chai_1.expect)(result[0]).to.have.property("averageRating", null);
    }));
    it("succeeds on retrieving vans filtered by date", () => __awaiter(void 0, void 0, void 0, function* () {
        const loc = yield data_1.Location.create({
            city: "Sitges",
            country: "Spain",
            point: { type: "Point", coordinates: [1.8, 41.23] },
            address: "Beach",
        });
        const vanWithTrip = yield data_1.Van.create({
            brand: "Citroën",
            model: "Berlingo",
            fuelType: "diesel",
            toilet: "fixed",
            windows: 3,
            year: "2023",
            bedCount: 2,
            doors: 2,
            location: loc._id,
            reviews: [],
            trips: [],
            maxTravellers: 3,
        });
        const freeVan = yield data_1.Van.create({
            brand: "Opel",
            model: "Zafira",
            fuelType: "diesel",
            toilet: "fixed",
            windows: 3,
            year: "2023",
            bedCount: 2,
            doors: 2,
            location: loc._id,
            reviews: [],
            trips: [],
            maxTravellers: 3,
        });
        const user = yield data_1.User.create({
            name: "Booking",
            lastName: "Guy",
            email: "booking@guy.com",
            password: "123123",
            location: loc._id,
        });
        const renter = yield data_1.User.create({
            name: "Renter",
            lastName: "Person",
            email: "renter@person.com",
            password: "123123",
            location: loc._id,
        });
        const trip = yield data_1.Trip.create({
            price: 100,
            startDate: new Date(2025, 6, 1),
            endDate: new Date(2025, 6, 5),
            renter: renter._id,
            van: vanWithTrip._id,
        });
        vanWithTrip.trips.push(trip._id);
        yield vanWithTrip.save();
        const result = yield (0, index_1.getVans)(user._id.toString(), [null, null], {
            start: new Date(2025, 6, 2),
            end: new Date(2025, 6, 4),
        });
        (0, chai_1.expect)(result).to.be.an("array").with.lengthOf(1);
        (0, chai_1.expect)(result[0].model).to.equal("Zafira");
    }));
    it("succeeds on retrieving vans filtered by location AND date", () => __awaiter(void 0, void 0, void 0, function* () {
        const loc = yield data_1.Location.create({
            city: "Tarragona",
            country: "Spain",
            point: { type: "Point", coordinates: [1.25, 41.11] },
            address: "Port",
        });
        const overlappingVan = yield data_1.Van.create({
            brand: "Fiat",
            model: "Overlapping",
            fuelType: "diesel",
            toilet: "fixed",
            windows: 3,
            year: "2023",
            bedCount: 2,
            doors: 2,
            location: loc._id,
            reviews: [],
            trips: [],
            maxTravellers: 3,
        });
        const freeVan = yield data_1.Van.create({
            brand: "Seat",
            model: "FreeTime",
            fuelType: "diesel",
            toilet: "fixed",
            windows: 3,
            year: "2023",
            bedCount: 2,
            doors: 2,
            location: loc._id,
            reviews: [],
            trips: [],
            maxTravellers: 3,
        });
        const user = yield data_1.User.create({
            name: "MultiFilter",
            lastName: "User",
            email: "filter@combo.com",
            password: "123123",
            location: loc._id,
        });
        const renter = yield data_1.User.create({
            name: "Renter",
            email: "rent@van.com",
            password: "123123",
            location: loc._id,
        });
        const trip = yield data_1.Trip.create({
            startDate: new Date(2025, 7, 1), // agost
            endDate: new Date(2025, 7, 5),
            renter: renter._id,
            van: overlappingVan._id,
        });
        overlappingVan.trips.push(trip._id);
        yield overlappingVan.save();
        const result = yield (0, index_1.getVans)(user._id.toString(), [1.25, 41.11], {
            start: new Date(2025, 7, 2),
            end: new Date(2025, 7, 4),
        });
        (0, chai_1.expect)(result).to.be.an("array").with.lengthOf(1);
        (0, chai_1.expect)(result[0].model).to.equal("FreeTime");
    }));
    it("throws ValidationError if userId is not a valid ObjectId", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_1.getVans)("not-a-valid-id", [null, null]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("ValidationError");
            (0, chai_1.expect)(err).to.be.instanceof(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("invalid");
        }
    }));
    it("throws NotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeId = new com_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.getVans)(fakeId, [null, null]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("NotFoundError");
            (0, chai_1.expect)(err).to.be.instanceof(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        }
    }));
    it("throws NotFoundError if user's location has no coordinates", () => __awaiter(void 0, void 0, void 0, function* () {
        const brokenLocation = yield data_1.Location.create({
            city: "NoCoords",
            country: "Spain",
            address: "Somewhere",
            point: undefined, // <- sense coordinates
        });
        const user = yield data_1.User.create({
            name: "Coordless",
            lastName: "User",
            email: "no@coords.com",
            password: "123123",
            location: brokenLocation._id,
        });
        try {
            yield (0, index_1.getVans)(user._id.toString(), [null, null]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("NotFoundError");
            (0, chai_1.expect)(err).to.be.instanceof(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.include("user location coordinates missing");
        }
    }));
    it("throws SystemError if DB fails while fetching location", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.Location.findById;
        data_1.Location.findById = () => ({
            lean: () => {
                throw new errors_1.SystemError("Simulated DB error while fetching location");
            },
        });
        const location = yield data_1.Location.create({
            city: "Any",
            country: "Spain",
            point: { type: "Point", coordinates: [2.1, 41.3] },
            address: "Somewhere",
        });
        const user = yield data_1.User.create({
            name: "FailLocation",
            email: "fail@loc.com",
            password: "123",
            location: location._id,
        });
        try {
            yield (0, index_1.getVans)(user._id.toString(), [null, null]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("SystemError");
            (0, chai_1.expect)(err).to.be.instanceof(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.include("Simulated DB error");
        }
        finally {
            data_1.Location.findById = original;
        }
    }));
    it("throws SystemError if DB fails while fetching nearby locations", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.Location.find;
        data_1.Location.find = () => ({
            select: () => {
                throw new errors_1.SystemError("Simulated location query fail");
            },
        });
        const location = yield data_1.Location.create({
            city: "ErrorLand",
            country: "Nowhere",
            point: { type: "Point", coordinates: [2.1, 41.3] },
            address: "Edge",
        });
        const user = yield data_1.User.create({
            name: "Error",
            email: "error@loc.com",
            password: "123",
            location: location._id,
        });
        try {
            yield (0, index_1.getVans)(user._id.toString(), [null, null]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("SystemError");
            (0, chai_1.expect)(err).to.be.instanceof(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.include("Simulated location query fail");
        }
        finally {
            data_1.Location.find = original;
        }
    }));
    it("throws SystemError if DB fails during van fetch", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.Van.find;
        data_1.Van.find = () => ({
            populate: () => ({
                select: () => ({
                    sort: () => ({
                        lean: () => {
                            throw new errors_1.SystemError("Simulated van fetch fail");
                        },
                    }),
                }),
            }),
        });
        const loc = yield data_1.Location.create({
            city: "ErrorCity",
            country: "ErrorCountry",
            point: { type: "Point", coordinates: [2, 41] },
            address: "Fail",
        });
        const user = yield data_1.User.create({
            name: "Crash",
            email: "crash@fail.com",
            password: "123",
            location: loc._id,
        });
        try {
            yield (0, index_1.getVans)(user._id.toString(), [null, null]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("SystemError");
            (0, chai_1.expect)(err).to.be.instanceof(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.include("Simulated van fetch fail");
        }
        finally {
            data_1.Van.find = original;
        }
    }));
    it("sets modifiedAt as null when not present", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "NullModCity",
            country: "NullModCountry",
            point: { type: "Point", coordinates: [1, 41] },
            address: "Null Mod",
        });
        const van = yield data_1.Van.create({
            model: "NoMod",
            brand: "NoModBrand",
            location: location._id,
            trips: [],
            reviews: [],
            windows: 2,
            doors: 2,
            bedCount: 2,
            fuelType: "diesel",
            maxTravellers: 4,
        });
        const user = yield data_1.User.create({
            name: "Modless",
            email: "mod@less.com",
            password: "123",
            location: location._id,
        });
        const result = yield (0, index_1.getVans)(user._id.toString(), [null, null]);
        (0, chai_1.expect)(result[0]).to.have.property("modifiedAt", null);
    }));
    it("sets modifiedAt properly when present and when absent", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const location = yield data_1.Location.create({
            city: "ModCity",
            country: "Spain",
            point: { type: "Point", coordinates: [2.12, 41.4] },
            address: "DateTest",
        });
        const now = new Date();
        // Van amb modifiedAt
        const modifiedVan = yield data_1.Van.create({
            model: "Modified",
            brand: "TestBrand",
            location: location._id,
            trips: [],
            reviews: [],
            windows: 2,
            doors: 2,
            bedCount: 2,
            fuelType: "diesel",
            maxTravellers: 4,
            modifiedAt: now,
        });
        // Van sense modifiedAt (undefined)
        const unmodifiedVan = yield data_1.Van.create({
            model: "Unmodified",
            brand: "OtherBrand",
            location: location._id,
            trips: [],
            reviews: [],
            windows: 2,
            doors: 2,
            bedCount: 2,
            fuelType: "diesel",
            maxTravellers: 4,
        });
        const user = yield data_1.User.create({
            name: "WithModDate",
            email: "mod@yes.com",
            password: "123123",
            location: location._id,
        });
        const result = yield (0, index_1.getVans)(user._id.toString(), [null, null]);
        const modified = result.find((van) => van.model === "Modified");
        const unmodified = result.find((van) => van.model === "Unmodified");
        (0, chai_1.expect)(modified === null || modified === void 0 ? void 0 : modified.modifiedAt).to.be.an.instanceOf(Date);
        (0, chai_1.expect)((_a = modified === null || modified === void 0 ? void 0 : modified.modifiedAt) === null || _a === void 0 ? void 0 : _a.toISOString()).to.equal(now.toISOString());
        (0, chai_1.expect)(unmodified === null || unmodified === void 0 ? void 0 : unmodified.modifiedAt).to.equal(null);
    }));
    it("throws ValidationError when validate.id fails", () => {
        (0, chai_1.expect)(() => (0, index_1.getVans)("", [null, null])).to.throw("invalid"); // assumeix que `validate.id` peta amb string buit
    });
    it("throws NotFoundError when user's location is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeLocationId = new com_1.Types.ObjectId();
        const user = yield data_1.User.create({
            name: "Ghost",
            email: "ghost@test.com",
            password: "123",
            location: fakeLocationId,
        });
        try {
            yield (0, index_1.getVans)(user._id.toString(), [null, null]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("NotFoundError");
            (0, chai_1.expect)(err).to.be.instanceof(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.include("user location not found");
        }
    }));
    it("throws SystemError if DB fails while fetching user", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.User.findById;
        data_1.User.findById = () => ({
            lean: () => {
                throw new Error("Simulated DB user fetch fail");
            },
        });
        try {
            yield (0, index_1.getVans)(new com_1.Types.ObjectId().toString(), [null, null]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("SystemError");
            (0, chai_1.expect)(err.message).to.include("Simulated DB user fetch fail");
        }
        finally {
            data_1.User.findById = original; // restableix el mètode original
        }
    }));
    it("throws SystemError if DB fails during van fetch", () => __awaiter(void 0, void 0, void 0, function* () {
        const originalVanFind = data_1.Van.find;
        data_1.Van.find = () => ({
            populate: () => ({
                select: () => ({
                    sort: () => ({
                        lean: () => {
                            throw new errors_1.SystemError("Simulated van fetch fail");
                        },
                    }),
                }),
            }),
        });
        const location = yield data_1.Location.create({
            city: "FailCity",
            country: "Nowhere",
            point: { type: "Point", coordinates: [2.0, 41.0] },
            address: "Nowhere Street",
        });
        const user = yield data_1.User.create({
            name: "FailureUser",
            email: "fail@fetch.com",
            password: "123456",
            location: location._id,
        });
        try {
            yield (0, index_1.getVans)(user._id.toString(), [2.0, 41.0]);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.name).to.equal("SystemError");
            (0, chai_1.expect)(err.message).to.include("Simulated van fetch fail");
        }
        finally {
            data_1.Van.find = originalVanFind;
        }
    }));
    it("sets modifiedAt as null when it's explicitly null", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "NullCity",
            country: "Spain",
            point: { type: "Point", coordinates: [1, 41] },
            address: "Null Street",
        });
        yield data_1.Van.create({
            model: "NullModel",
            brand: "NullBrand",
            location: location._id,
            trips: [],
            reviews: [],
            windows: 2,
            doors: 2,
            bedCount: 2,
            fuelType: "diesel",
            maxTravellers: 4,
            modifiedAt: null, // <- això activa el ternari
        });
        const user = yield data_1.User.create({
            name: "NullModUser",
            email: "null@mod.com",
            password: "123",
            location: location._id,
        });
        const result = yield (0, index_1.getVans)(user._id.toString(), [null, null]);
        (0, chai_1.expect)(result[0].modifiedAt).to.equal(null);
    }));
    it("retrieves van with review populated with author name", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "ReviewTown",
            country: "Spain",
            point: { type: "Point", coordinates: [2.0, 41.0] },
            address: "Review St",
        });
        const author = yield data_1.User.create({
            name: "Reviewer",
            lastName: "Reviewer",
            email: "review@user.com",
            password: "123",
            location: location._id,
        });
        const review = yield data_1.Review.create({
            comment: "Great van!",
            author: author._id,
            rating: 5,
        });
        const van = yield data_1.Van.create({
            model: "ReviewModel",
            brand: "VanBrand",
            location: location._id,
            trips: [],
            reviews: [review._id],
            windows: 2,
            doors: 2,
            bedCount: 2,
            fuelType: "diesel",
            maxTravellers: 4,
        });
        const user = yield data_1.User.create({
            name: "Searcher",
            email: "search@user.com",
            password: "123",
            location: location._id,
        });
        const result = yield (0, index_1.getVans)(user._id.toString(), [null, null]);
        (0, chai_1.expect)(result[0].reviews).to.have.lengthOf(1);
        (0, chai_1.expect)(result[0].reviews[0].comment).to.equal("Great van!");
        (0, chai_1.expect)(result[0].reviews[0].author.name).to.equal("Reviewer");
        (0, chai_1.expect)(result[0].reviews[0].author.lastName).to.equal("Reviewer");
    }));
    afterEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Location.deleteMany({}),
            data_1.Trip.deleteMany({}),
        ]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
