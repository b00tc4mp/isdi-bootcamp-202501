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
describe("getVanReviews", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Review.deleteMany({}),
        ]);
    });
    it("returns sanitized reviews with average rating", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const author = yield data_1.User.create({
            name: "Anna",
            lastName: "Puig",
            email: "anna@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const review1 = yield data_1.Review.create({
            rating: 4,
            comment: "Perfecte!",
            author: author._id,
        });
        const review2 = yield data_1.Review.create({
            rating: 2,
            comment: "Justet",
            author: author._id,
        });
        const van = yield data_1.Van.create({
            model: "California",
            brand: "VW",
            price: 300,
            location: new mongoose_1.Types.ObjectId(),
            owner: user._id,
            reviews: [review1._id, review2._id],
            windows: 2,
            doors: 3,
            bedCount: 2,
            fuelType: "diesel",
        });
        const result = yield (0, index_1.getVanReviews)(user._id.toString(), van._id.toString());
        (0, chai_1.expect)(result).to.have.property("averageRating", 3);
        (0, chai_1.expect)(result.reviews).to.be.an("array").with.lengthOf(2);
        (0, chai_1.expect)(result.reviews[0]).to.have.property("comment");
        (0, chai_1.expect)(result.reviews[0].author).to.have.property("name", "Anna");
    }));
    it("returns empty reviews array and null averageRating if no reviews", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const van = yield data_1.Van.create({
            model: "Ford Nugget",
            brand: "Ford",
            price: 270,
            location: new mongoose_1.Types.ObjectId(),
            owner: user._id,
            reviews: [],
            windows: 2,
            doors: 3,
            bedCount: 2,
            fuelType: "diesel",
        });
        const result = yield (0, index_1.getVanReviews)(user._id.toString(), van._id.toString());
        (0, chai_1.expect)(result.reviews).to.be.an("array").with.lengthOf(0);
        (0, chai_1.expect)(result.averageRating).to.equal(null);
    }));
    it("throws NotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        const fakeVanId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.getVanReviews)(fakeUserId, fakeVanId);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        }
    }));
    it("throws NotFoundError if van does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Test",
            email: "marc2@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const fakeVanId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.getVanReviews)(user._id.toString(), fakeVanId);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("van not found");
        }
    }));
    it("throws ValidationError on invalid userId or vanId", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_1.getVanReviews)("invalid-id", "also-invalid");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("invalid");
        }
    }));
    afterEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Review.deleteMany({}),
        ]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
