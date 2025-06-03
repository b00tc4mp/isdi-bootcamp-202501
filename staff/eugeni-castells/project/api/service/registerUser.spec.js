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
describe("registerUser", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([data_1.User.deleteMany({}), data_1.Location.deleteMany({})]);
    });
    afterEach(() => {
        return Promise.all([data_1.User.deleteMany({}), data_1.Location.deleteMany({})]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
    it("registers a user successfully with full data", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123123123",
            city: "Barcelona",
            country: "Spain",
            address: "Carrer Major",
            coordinates: [2.17, 41.38],
        };
        yield (0, index_1.registerUser)(input);
        const user = yield data_1.User.findOne({ email: input.email });
        (0, chai_1.expect)(user).to.exist;
        (0, chai_1.expect)(user.name).to.equal("Marc");
    }));
    it("fails if email is duplicated", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            name: "Test",
            lastName: "User",
            email: "duplicate@test.com",
            password: "123123123",
            city: "Madrid",
            country: "Spain",
            address: "Gran Via",
            coordinates: [3.7, 40.4],
        };
        yield data_1.User.create({
            name: input.name,
            lastName: input.lastName,
            email: input.email,
            password: input.password,
            location: new mongoose_1.Types.ObjectId(),
        });
        try {
            yield (0, index_1.registerUser)(input);
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.DuplicityError);
        }
    }));
    it("throws LocationError if getCityCountryFromCoords fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            name: "Geo",
            lastName: "Error",
            email: "geoerror@test.com",
            password: "123123123",
            city: "",
            country: "",
            address: "Nowhere",
            coordinates: [0, 0],
        };
        try {
            yield (0, index_1.registerUser)(input);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.LocationError);
        }
    }));
    it("throws ValidationError if input is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            name: "Ma", // too short
            lastName: "",
            email: "notanemail",
            password: "123",
            city: "",
            country: "",
            address: "",
            coordinates: [0, 0],
        };
        try {
            yield (0, index_1.registerUser)(input);
            throw new Error("Should have failed");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(Error);
        }
    }));
});
