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
(0, mocha_1.describe)("getVans", () => {
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
    it("succeeds on retrieving vans with no filter", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Test City",
            country: "Test Country",
            point: { type: "Point", coordinates: [40.7128, -74.006] },
            address: "Test Address",
        });
        let locationId = location._id;
        const londres = yield data_1.Location.create({
            city: "Test City",
            country: "Test Country",
            point: { type: "Point", coordinates: [40.7128, -74.006] },
            address: "Test Address",
        });
        let location2Id = londres._id;
        const bali = yield data_1.Location.create({
            city: "bali",
            country: "Indonesia",
            point: { type: "Point", coordinates: [115.1889, -8.4095] },
            address: "Test Address",
        });
        let location3Id = bali._id;
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
        const retrievedVans = yield (0, getVans_1.getVans)(user._id.toString(), [null, null]);
        (0, chai_1.expect)(retrievedVans).to.be.an("array");
        (0, chai_1.expect)(retrievedVans.length).to.be.greaterThan(0);
        vans.forEach((van) => {
            (0, chai_1.expect)(van).to.have.property("location");
            (0, chai_1.expect)(van).to.have.property("model");
            (0, chai_1.expect)(van).to.have.property("brand");
        });
        (0, chai_1.expect)(vans[0].model).to.equal("NX500");
    }));
    it("succeeds on retrieving vans with location filter", () => __awaiter(void 0, void 0, void 0, function* () {
        const londres = yield data_1.Location.create({
            city: "Londres",
            country: "UK",
            point: { type: "Point", coordinates: [-0.1276, 51.5072] },
            address: "Test Address",
        });
        let locationId = londres._id;
        const berlin = yield data_1.Location.create({
            city: "Berlin",
            country: "Germany",
            point: { type: "Point", coordinates: [13.405, 52.52] },
            address: "Test Address",
        });
        let location2Id = berlin._id;
        const bali = yield data_1.Location.create({
            city: "Bali",
            country: "Indonesia",
            point: { type: "Point", coordinates: [115.1889, -8.4095] },
            address: "Test Address",
        });
        let location3Id = bali._id;
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
                model: "VM500",
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
        const searchLocation = yield data_1.Location.create({
            city: "Prenzlauer",
            country: "Germany",
            point: {
                type: "Point",
                coordinates: [13.42443, 52.53878],
            },
        });
        const retrievedVans = yield (0, getVans_1.getVans)(user._id.toString(), [
            searchLocation.point.coordinates[0],
            searchLocation.point.coordinates[1],
        ]);
        (0, chai_1.expect)(retrievedVans).to.be.an("array");
        (0, chai_1.expect)(retrievedVans.length).to.equal(1);
        (0, chai_1.expect)(retrievedVans[0].model).to.equal("VM500");
        retrievedVans.forEach((van) => {
            (0, chai_1.expect)(van).to.have.property("location");
            (0, chai_1.expect)(van).to.have.property("model");
            (0, chai_1.expect)(van).to.have.property("brand");
        });
    }));
    it("succeeds on retrieving vans with dates filter", () => __awaiter(void 0, void 0, void 0, function* () {
        debugger;
        const plaçaCatalunya = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.1701, 41.387] }, // Plaça Catalunya
            address: "Plaça de Catalunya",
        });
        let plaçaCatalunyaId = plaçaCatalunya._id;
        const sagradaFamilia = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.1744, 41.4036] }, // Sagrada Família
            address: "Carrer de Mallorca, 401",
        });
        let sagradaFamiliaId = sagradaFamilia._id;
        const pobleSec = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.1639, 41.3722] }, // Poble-sec
            address: "Carrer de Blai",
        });
        let pobleSecId = pobleSec._id;
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
                location: plaçaCatalunyaId,
                reviews: [],
            },
            {
                brand: "toyota",
                model: "VM500",
                shower: "inside",
                fuelType: "diesel",
                toilet: "fixed",
                year: "2022",
                windows: 4,
                bedCount: 1,
                doors: 2,
                location: sagradaFamiliaId,
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
                location: pobleSecId,
                reviews: [],
            },
        ]);
        const user = yield data_1.User.create({
            name: "Test User",
            lastName: "testuser",
            email: "testuser@example.com",
            password: "hashedpassword",
            location: pobleSecId,
            roadPoints: 0,
        });
        const renter = yield data_1.User.create({
            name: "Test renter",
            lastName: "testuser",
            email: "testRenter@example.com",
            password: "hashedpassword",
            location: pobleSecId,
            roadPoints: 0,
        });
        const trip = yield data_1.Trip.create({
            price: 344,
            startDate: new Date(2025, 3, 1),
            endDate: new Date(2025, 3, 3),
            renter: renter,
            owner: user._id,
            van: vans[0]._id,
        });
        vans[0].trips.push(trip._id);
        yield vans[0].save();
        const retrievedVans = yield (0, getVans_1.getVans)(user._id.toString(), [null, null], {
            start: trip.startDate,
            end: trip.endDate,
        });
        (0, chai_1.expect)(retrievedVans).to.be.an("array");
        (0, chai_1.expect)(retrievedVans.length).to.equal(2);
        (0, chai_1.expect)(retrievedVans[0].model).to.equal("VM500");
        retrievedVans.forEach((van) => {
            (0, chai_1.expect)(van).to.have.property("location");
            (0, chai_1.expect)(van).to.have.property("model");
            (0, chai_1.expect)(van).to.have.property("brand");
        });
    }));
    it("succeeds on retrieving vans with location and dates filter", () => __awaiter(void 0, void 0, void 0, function* () {
        debugger;
        const plaçaCatalunya = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.1701, 41.387] }, // Plaça Catalunya
            address: "Plaça de Catalunya",
        });
        let plaçaCatalunyaId = plaçaCatalunya._id;
        const sagradaFamilia = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.1744, 41.4036] }, // Sagrada Família
            address: "Carrer de Mallorca, 401",
        });
        let sagradaFamiliaId = sagradaFamilia._id;
        const paris = yield data_1.Location.create({
            city: "Paris",
            country: "France",
            point: { type: "Point", coordinates: [2.3522, 48.8566] }, // Poble-sec
            address: "Carrer de Blai",
        });
        let parisId = paris._id;
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
                location: plaçaCatalunyaId,
                reviews: [],
            },
            {
                brand: "toyota",
                model: "VM500",
                shower: "inside",
                fuelType: "diesel",
                toilet: "fixed",
                year: "2022",
                windows: 4,
                bedCount: 1,
                doors: 2,
                location: sagradaFamiliaId,
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
                location: parisId,
                reviews: [],
            },
        ]);
        const user = yield data_1.User.create({
            name: "Test User",
            lastName: "testuser",
            email: "testuser@example.com",
            password: "hashedpassword",
            location: parisId,
            roadPoints: 0,
        });
        const renter = yield data_1.User.create({
            name: "Test renter",
            lastName: "testuser",
            email: "testRenter@example.com",
            password: "hashedpassword",
            location: sagradaFamiliaId,
            roadPoints: 0,
        });
        const trip = yield data_1.Trip.create({
            price: 344,
            startDate: new Date(2025, 3, 1),
            endDate: new Date(2025, 3, 3),
            renter: renter,
            owner: user._id,
            van: vans[0]._id,
        });
        vans[0].trips.push(trip._id);
        yield vans[0].save();
        const retrievedVans = yield (0, getVans_1.getVans)(user._id.toString(), [
            plaçaCatalunya.point.coordinates[0],
            plaçaCatalunya.point.coordinates[1],
        ], {
            start: trip.startDate,
            end: trip.endDate,
        });
        (0, chai_1.expect)(retrievedVans).to.be.an("array");
        (0, chai_1.expect)(retrievedVans.length).to.equal(1);
        (0, chai_1.expect)(retrievedVans[0].model).to.equal("VM500");
        retrievedVans.forEach((van) => {
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
