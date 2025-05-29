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
const errors_1 = require("com/errors");
const index_1 = require("./index");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe("getAllUserInfo", () => {
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
    it("returns sanitized user info with location and vans", () => {
        let userId;
        let locationId;
        let vanId;
        return data_1.Location.create({
            city: "Barcelona",
            country: "Catalunya",
        })
            .then((location) => {
            locationId = location._id;
            return data_1.User.create({
                name: "Marc",
                lastName: "Castellet",
                email: "marc@test.com",
                password: "123123",
                location: location._id,
                vans: [],
            });
        })
            .then((user) => {
            userId = user._id;
            return data_1.Van.create({
                model: "Transporter",
                brand: "VW",
                owner: userId,
                location: locationId,
                price: 300,
                year: new Date(),
                images: [],
                accessible: true,
                reviews: [],
                legal: [],
                trips: [],
                windows: 4,
                doors: 3,
                heating: true,
                airConditioning: false,
                bedCount: 2,
                insideKitchen: true,
                fridge: false,
                toilet: "fixed",
                shower: true,
                fuelType: "diesel",
                storage: 50,
            });
        })
            .then((van) => {
            vanId = van._id;
            return data_1.User.updateOne({ _id: userId }, { $push: { vans: vanId } });
        })
            .then(() => {
            return (0, index_1.getAllUserInfo)(userId.toString());
        })
            .then((result) => {
            (0, chai_1.expect)(result).to.be.an("object");
            (0, chai_1.expect)(result).to.have.property("id", userId.toString());
            (0, chai_1.expect)(result).to.have.property("location");
            (0, chai_1.expect)(result.location.city).to.equal("Barcelona");
            (0, chai_1.expect)(result.location.country).to.equal("Catalunya");
            (0, chai_1.expect)(result.vans).to.be.an("array").with.lengthOf(1);
            (0, chai_1.expect)(result.vans[0].brand).to.equal("VW");
            (0, chai_1.expect)(result.vans[0].location.city).to.equal("Barcelona");
        });
    });
    it("throws NotFoundError if user does not exist", () => {
        const fakeId = new mongoose_1.Types.ObjectId().toString();
        return (0, index_1.getAllUserInfo)(fakeId).catch((err) => {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.name).to.equal("NotFoundError");
            (0, chai_1.expect)(err.message).to.equal("user not found");
        });
    });
    it("throws ValidationError if id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const brokenId = "invalid-object-id";
        try {
            yield (0, index_1.getAllUserInfo)(brokenId);
            throw new Error("Expected function to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("invalid");
        }
    }));
    it("returns user info correctly even if user has no vans", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Lleida",
            country: "Spain",
        });
        const user = yield data_1.User.create({
            name: "Sense",
            lastName: "Vans",
            email: "novans@test.com",
            password: "123",
            location: location._id,
            vans: [], // important
        });
        const result = yield (0, index_1.getAllUserInfo)(user._id.toString());
        (0, chai_1.expect)(result).to.have.property("id", user._id.toString());
        (0, chai_1.expect)(result.vans).to.be.an("array").that.is.empty;
        (0, chai_1.expect)(result.location.city).to.equal("Lleida");
    }));
    it("throws SystemError if DB fails during findById", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.User.findById;
        data_1.User.findById = () => ({
            populate: () => {
                throw new Error("Simulated populate error");
            },
        });
        try {
            yield (0, index_1.getAllUserInfo)(new mongoose_1.Types.ObjectId().toString());
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.include("Simulated populate error");
        }
        finally {
            data_1.User.findById = original;
        }
    }));
    it("throws NotFoundError if user is not found after successful DB query", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.User.findById;
        data_1.User.findById = () => ({
            populate: () => ({
                select: () => ({
                    lean: () => Promise.resolve(null), // aquí es retorna null, no error
                }),
            }),
        });
        try {
            yield (0, index_1.getAllUserInfo)(new mongoose_1.Types.ObjectId().toString());
            throw new Error("Should have thrown");
        }
        catch (err) {
            // Ara ha d'agafar el !user i tirar el NotFoundError
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        }
        finally {
            data_1.User.findById = original;
        }
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
