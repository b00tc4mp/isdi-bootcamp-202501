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
describe("acceptTripRequest", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Trip.deleteMany({}),
            data_1.Chat.deleteMany({}),
        ]);
    });
    it("accepts a trip and creates chat between owner and renter", () => __awaiter(void 0, void 0, void 0, function* () {
        const owner = yield data_1.User.create({
            name: "Owner",
            lastName: "Vanlord",
            email: "owner@example.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const renter = yield data_1.User.create({
            name: "Renter",
            lastName: "Guest",
            email: "renter@example.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "T6",
            brand: "VW",
            year: new Date(2021, 0, 1),
            images: [],
            accessible: false,
            price: 250,
            location: new mongoose_1.Types.ObjectId(),
            legal: [],
            trips: [],
            windows: 4,
            doors: 3,
            heating: false,
            airConditioning: false,
            bedCount: 2,
            insideKitchen: true,
            fridge: true,
            toilet: "portable",
            shower: false,
            fuelType: "diesel",
            storage: 150,
            owner: owner._id,
        });
        const trip = yield data_1.Trip.create({
            startDate: new Date(),
            endDate: new Date(),
            van: van._id,
            renter: renter._id,
            issues: [],
            paymentStatus: "pending",
            paymentMethod: "currency",
            confirmStatus: "pending",
            price: 250,
            agreements: [],
        });
        yield (0, index_1.acceptTripRequest)(owner._id.toString(), trip._id.toString());
        const updatedTrip = yield data_1.Trip.findById(trip._id);
        const createdChats = yield data_1.Chat.find({
            participants: { $all: [owner._id, renter._id] },
        });
        (0, chai_1.expect)(updatedTrip === null || updatedTrip === void 0 ? void 0 : updatedTrip.confirmStatus).to.equal("accepted");
        (0, chai_1.expect)(createdChats).to.have.lengthOf(1);
    }));
    it("does not create chat if renter is also the owner", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Solo",
            lastName: "Traveler",
            email: "solo@example.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "Sprinter",
            brand: "Mercedes",
            year: new Date(2020, 0, 1),
            images: [],
            accessible: true,
            price: 200,
            location: new mongoose_1.Types.ObjectId(),
            legal: [],
            trips: [],
            windows: 3,
            doors: 3,
            heating: true,
            airConditioning: true,
            bedCount: 2,
            insideKitchen: true,
            fridge: true,
            toilet: "fixed",
            shower: true,
            fuelType: "diesel",
            storage: 100,
            owner: user._id,
        });
        const trip = yield data_1.Trip.create({
            startDate: new Date(),
            endDate: new Date(),
            van: van._id,
            renter: user._id,
            issues: [],
            paymentStatus: "pending",
            paymentMethod: "currency",
            confirmStatus: "pending",
            price: 200,
            agreements: [],
        });
        yield (0, index_1.acceptTripRequest)(user._id.toString(), trip._id.toString());
        const updatedTrip = yield data_1.Trip.findById(trip._id);
        const chats = yield data_1.Chat.find({});
        (0, chai_1.expect)(updatedTrip === null || updatedTrip === void 0 ? void 0 : updatedTrip.confirmStatus).to.equal("accepted");
        (0, chai_1.expect)(chats).to.have.lengthOf(0);
    }));
    it("fails because user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeId = new mongoose_1.Types.ObjectId();
        const trip = yield data_1.Trip.create({
            startDate: new Date(),
            endDate: new Date(),
            van: fakeId,
            renter: fakeId,
            issues: [],
            paymentStatus: "pending",
            paymentMethod: "currency",
            confirmStatus: "pending",
            price: 200,
            agreements: [],
        });
        try {
            yield (0, index_1.acceptTripRequest)(fakeId.toString(), trip._id.toString());
        }
        catch (error) {
            (0, chai_1.expect)(error).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(error.message).to.equal("user not found");
        }
    }));
    it("fails because trip not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Solo",
            lastName: "Traveler",
            email: "solo@example.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const fakeId = new mongoose_1.Types.ObjectId();
        try {
            yield (0, index_1.acceptTripRequest)(user._id.toString(), fakeId.toString());
        }
        catch (error) {
            (0, chai_1.expect)(error).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(error.message).to.equal("trip not found");
        }
    }));
    afterEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Trip.deleteMany({}),
            data_1.Chat.deleteMany({}),
        ]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
