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
const getVans_1 = require("./getVans");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
mocha_1.describe.only("getVans", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Location.deleteMany({}),
        ]);
    });
    it("succeeds on retrieving vans", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Test City",
            country: "Test Country",
            point: { type: "Point", coordinates: [40.7128, -74.006] },
            address: "Test Address",
        });
        let locationId = location._id;
        const location2 = yield data_1.Location.create({
            city: "Test City",
            country: "Test Country",
            point: { type: "Point", coordinates: [40.7128, -74.006] },
            address: "Test Address",
        });
        let location2Id = location2._id;
        const location3 = yield data_1.Location.create({
            city: "Test City",
            country: "Test Country",
            point: { type: "Point", coordinates: [40.7128, -74.006] },
            address: "Test Address",
        });
        let location3Id = location3._id;
        const vans = yield data_1.Van.create([
            {
                brand: "toyota",
                model: "NX500",
                shower: "inside",
                fuelType: "diesel",
                toilet: "fixed",
                windows: 4,
                year: "2022",
                bedCount: 1,
                doors: 2,
                location: locationId,
                reviews: [],
            },
            {
                brand: "toyota",
                model: "NX500",
                shower: "inside",
                fuelType: "diesel",
                toilet: "fixed",
                year: "2022",
                windows: 4,
                bedCount: 1,
                doors: 2,
                location: location2Id,
                reviews: [],
            },
            {
                brand: "toyota",
                model: "NX500",
                shower: "inside",
                fuelType: "diesel",
                toilet: "fixed",
                year: "2022",
                windows: 4,
                bedCount: 1,
                doors: 2,
                location: location3Id,
                reviews: [],
            },
        ]);
        const user = yield data_1.User.create({
            name: "Test User",
            username: "testuser",
            email: "testuser@example.com",
            password: "hashedpassword",
            location: locationId,
            roadPoints: 0,
        });
        const retrievedVans = yield (0, getVans_1.getVans)(user._id.toString());
        (0, chai_1.expect)(retrievedVans).to.be.an("array");
        (0, chai_1.expect)(retrievedVans.length).to.be.greaterThan(0);
        vans.forEach((van) => {
            (0, chai_1.expect)(van).to.have.property("location");
            (0, chai_1.expect)(van).to.have.property("model");
            (0, chai_1.expect)(van).to.have.property("brand");
        });
    }));
    afterEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Location.deleteMany({}),
        ]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
