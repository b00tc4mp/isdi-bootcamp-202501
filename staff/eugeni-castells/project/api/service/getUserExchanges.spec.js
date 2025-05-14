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
describe("getUserExchanges", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Trip.deleteMany({}),
            data_1.Van.deleteMany({}),
        ]);
    });
    it("returns accepted and pending trips separated by role", () => __awaiter(void 0, void 0, void 0, function* () {
        const renter = yield data_1.User.create({
            name: "Marc",
            lastName: "Renter",
            email: "renter@test.com",
            password: "123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const owner = yield data_1.User.create({
            name: "Anna",
            lastName: "Owner",
            email: "owner@test.com",
            password: "123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "California",
            brand: "VW",
            location: new mongoose_1.Types.ObjectId(),
            price: 300,
            owner: owner._id,
            images: [],
            windows: 2,
            doors: 3,
            heating: false,
            airConditioning: false,
            bedCount: 2,
            fuelType: "diesel",
        });
        const acceptedTrip = yield data_1.Trip.create({
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-06-10"),
            van: van._id,
            renter: renter._id,
            confirmStatus: "accepted",
            paymentMethod: "currency",
            paymentStatus: "payed",
        });
        const pendingTrip = yield data_1.Trip.create({
            startDate: new Date("2025-07-01"),
            endDate: new Date("2025-07-10"),
            van: van._id,
            renter: renter._id,
            confirmStatus: "pending",
            paymentMethod: "currency",
            paymentStatus: "pending",
        });
        yield data_1.User.findByIdAndUpdate(renter._id, {
            $push: { trips: [acceptedTrip._id, pendingTrip._id] },
        });
        const result = yield (0, index_1.getUserExchanges)(renter._id.toString());
        (0, chai_1.expect)(result).to.have.property("trips");
        (0, chai_1.expect)(result.trips.all).to.have.lengthOf(1);
        (0, chai_1.expect)(result.trips.user).to.have.lengthOf(1);
        (0, chai_1.expect)(result.trips.vans).to.have.lengthOf(0);
        (0, chai_1.expect)(result).to.have.property("pendingRequests");
        (0, chai_1.expect)(result.pendingRequests.all).to.have.lengthOf(1);
        (0, chai_1.expect)(result.pendingRequests.user).to.have.lengthOf(1);
        (0, chai_1.expect)(result.pendingRequests.toUser).to.have.lengthOf(0);
    }));
    it("returns empty arrays when user has no trips", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Empty",
            lastName: "User",
            email: "empty@test.com",
            password: "123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const result = yield (0, index_1.getUserExchanges)(user._id.toString());
        (0, chai_1.expect)(result.trips.all).to.have.lengthOf(0);
        (0, chai_1.expect)(result.trips.user).to.have.lengthOf(0);
        (0, chai_1.expect)(result.trips.vans).to.have.lengthOf(0);
        (0, chai_1.expect)(result.pendingRequests.all).to.have.lengthOf(0);
        (0, chai_1.expect)(result.pendingRequests.user).to.have.lengthOf(0);
        (0, chai_1.expect)(result.pendingRequests.toUser).to.have.lengthOf(0);
    }));
    it("throws NotFoundError if user does not exist", () => {
        const fakeId = new mongoose_1.Types.ObjectId().toString();
        return (0, index_1.getUserExchanges)(fakeId).catch((err) => {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        });
    });
    it("throws ValidationError if userId is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_1.getUserExchanges)("invalid-id");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("invalid");
        }
    }));
    it("returns empty trips arrays if no trip is accepted", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Reject",
            lastName: "Only",
            email: "reject@test.com",
            password: "123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "Solo",
            brand: "Fiat",
            location: new mongoose_1.Types.ObjectId(),
            price: 300,
            owner: user._id,
            windows: 2,
            doors: 3,
            heating: false,
            airConditioning: false,
            bedCount: 2,
            fuelType: "diesel",
            images: [],
        });
        const rejectedTrip = yield data_1.Trip.create({
            startDate: new Date(),
            endDate: new Date(),
            van: van._id,
            renter: user._id,
            confirmStatus: "rejected",
            paymentMethod: "currency",
            paymentStatus: "pending",
        });
        yield data_1.User.findByIdAndUpdate(user._id, {
            $push: { trips: [rejectedTrip._id] },
        });
        const result = yield (0, index_1.getUserExchanges)(user._id.toString());
        (0, chai_1.expect)(result.trips.all).to.have.lengthOf(0);
        (0, chai_1.expect)(result.trips.user).to.have.lengthOf(0);
        (0, chai_1.expect)(result.trips.vans).to.have.lengthOf(0);
    }));
    it("returns empty pendingRequests if there are only accepted trips", () => __awaiter(void 0, void 0, void 0, function* () {
        const renter = yield data_1.User.create({
            name: "Renter",
            email: "onlyaccepted@test.com",
            password: "123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "acceptedowner@test.com",
            password: "123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "Ocean",
            brand: "VW",
            location: new mongoose_1.Types.ObjectId(),
            price: 200,
            owner: owner._id,
            windows: 2,
            doors: 2,
            heating: true,
            airConditioning: true,
            bedCount: 2,
            fuelType: "diesel",
            images: [],
        });
        const acceptedTrip = yield data_1.Trip.create({
            startDate: new Date(),
            endDate: new Date(),
            van: van._id,
            renter: renter._id,
            confirmStatus: "accepted",
            paymentMethod: "currency",
            paymentStatus: "payed",
        });
        yield data_1.User.findByIdAndUpdate(renter._id, {
            $push: { trips: [acceptedTrip._id] },
        });
        const result = yield (0, index_1.getUserExchanges)(renter._id.toString());
        (0, chai_1.expect)(result.pendingRequests.all).to.have.lengthOf(0);
        (0, chai_1.expect)(result.pendingRequests.user).to.have.lengthOf(0);
        (0, chai_1.expect)(result.pendingRequests.toUser).to.have.lengthOf(0);
    }));
    it("returns pending request from others to user if user is owner", () => __awaiter(void 0, void 0, void 0, function* () {
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "owner@toyou.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const renter = yield data_1.User.create({
            name: "Guest",
            email: "guest@trip.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "T6",
            brand: "VW",
            location: new mongoose_1.Types.ObjectId(),
            price: 100,
            owner: owner._id,
            windows: 2,
            doors: 3,
            heating: false,
            airConditioning: true,
            bedCount: 2,
            fuelType: "diesel",
            images: [],
        });
        const pendingTrip = yield data_1.Trip.create({
            startDate: new Date(),
            endDate: new Date(),
            van: van._id,
            renter: renter._id,
            confirmStatus: "pending",
            paymentMethod: "currency",
            paymentStatus: "pending",
        });
        yield data_1.User.findByIdAndUpdate(owner._id, {
            $push: { trips: [pendingTrip._id] },
        });
        const result = yield (0, index_1.getUserExchanges)(owner._id.toString());
        (0, chai_1.expect)(result.pendingRequests.toUser).to.have.lengthOf(1);
    }));
    afterEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Trip.deleteMany({}),
            data_1.Van.deleteMany({}),
        ]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
