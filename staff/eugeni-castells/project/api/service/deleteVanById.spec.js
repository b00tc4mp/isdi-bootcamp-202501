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
describe("deleteVanById", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Trip.deleteMany({}),
        ]);
    });
    it("deletes a van and pending trips successfully", () => {
        let userId;
        let vanId;
        let tripId;
        return data_1.User.create({
            name: "Owner",
            email: "owner@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        })
            .then((user) => {
            userId = user._id;
            return data_1.Van.create({
                model: "TestVan",
                brand: "TestBrand",
                year: new Date(),
                images: [],
                accessible: false,
                price: 100,
                location: new mongoose_1.Types.ObjectId(),
                legal: [],
                trips: [],
                windows: 2,
                doors: 2,
                heating: false,
                airConditioning: false,
                bedCount: 2,
                insideKitchen: false,
                fridge: false,
                toilet: "none",
                shower: false,
                fuelType: "petrol",
                storage: 50,
                owner: userId,
            });
        })
            .then((van) => {
            vanId = van._id;
            return Promise.all([
                data_1.User.updateOne({ _id: userId }, { $push: { vans: vanId } }),
                data_1.Trip.create({
                    startDate: new Date(),
                    endDate: new Date(),
                    van: vanId,
                    renter: userId,
                    confirmStatus: "pending",
                    paymentStatus: "pending",
                    paymentMethod: "currency",
                    agreements: [],
                    issues: [],
                    price: 100,
                }),
            ]);
        })
            .then(([_, trip]) => {
            tripId = trip._id;
            return (0, index_1.deleteVanById)(userId.toString(), vanId.toString());
        })
            .then(() => {
            return Promise.all([
                data_1.Van.findById(vanId),
                data_1.Trip.findById(tripId),
                data_1.User.findById(userId),
            ]);
        })
            .then(([van, trip, user]) => {
            (0, chai_1.expect)(van).to.be.null;
            (0, chai_1.expect)(trip).to.be.null;
            (0, chai_1.expect)(user === null || user === void 0 ? void 0 : user.vans).to.not.include(vanId);
        });
    });
    it("throws NotFoundError if user does not exist", () => {
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        const fakeVanId = new mongoose_1.Types.ObjectId().toString();
        return (0, index_1.deleteVanById)(fakeUserId, fakeVanId).catch((err) => {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        });
    });
    it("throws NotFoundError if van does not exist", () => {
        return data_1.User.create({
            name: "Tester",
            email: "t@t.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        })
            .then((user) => {
            return (0, index_1.deleteVanById)(user._id.toString(), new mongoose_1.Types.ObjectId().toString());
        })
            .catch((err) => {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("van not found");
        });
    });
    it("throws ValidationError for invalid userId", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_1.deleteVanById)("invalid-id", new mongoose_1.Types.ObjectId().toString());
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("ValidationError");
        }
    }));
    it("throws ValidationError for invalid vanId", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_1.deleteVanById)(new mongoose_1.Types.ObjectId().toString(), "invalid-id");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("ValidationError");
        }
    }));
    it("throws SystemError if Trip.find fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Test",
            email: "test@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "TestVan",
            brand: "TestBrand",
            year: new Date(),
            images: [],
            accessible: false,
            price: 100,
            location: new mongoose_1.Types.ObjectId(),
            legal: [],
            trips: [],
            windows: 2,
            doors: 2,
            heating: false,
            airConditioning: false,
            bedCount: 2,
            insideKitchen: false,
            fridge: false,
            toilet: "none",
            shower: false,
            fuelType: "petrol",
            storage: 50,
            owner: user._id,
        });
        yield data_1.User.updateOne({ _id: user._id }, { $push: { vans: van._id } });
        const originalFind = data_1.Trip.find;
        data_1.Trip.find = () => {
            throw new Error("Simulated DB failure on Trip.find");
        };
        try {
            yield (0, index_1.deleteVanById)(user._id.toString(), van._id.toString());
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err.name).to.equal("SystemError");
        }
        finally {
            data_1.Trip.find = originalFind;
        }
    }));
    afterEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Trip.deleteMany({}),
        ]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
