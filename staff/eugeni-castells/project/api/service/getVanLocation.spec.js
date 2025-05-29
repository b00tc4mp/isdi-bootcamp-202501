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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const mongoose_1 = require("mongoose");
const getVanLocation_1 = require("./getVanLocation");
const data_1 = require("../data");
const errors_1 = require("com/errors");
describe("getVanLocation", () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    it("returns location object if van is found", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeVanId = new mongoose_1.Types.ObjectId().toString();
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        const expectedLocation = { city: "Barcelona", country: "Spain" };
        sinon_1.default.stub(data_1.Van, "findById").returns({
            lean: () => Promise.resolve({ _id: fakeVanId, location: expectedLocation }),
        });
        const result = yield (0, getVanLocation_1.getVanLocation)(fakeUserId, fakeVanId);
        (0, chai_1.expect)(result).to.deep.equal(expectedLocation);
    }));
    it("throws NotFoundError if van is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeVanId = new mongoose_1.Types.ObjectId().toString();
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        sinon_1.default.stub(data_1.Van, "findById").returns({
            lean: () => Promise.resolve(null),
        });
        try {
            yield (0, getVanLocation_1.getVanLocation)(fakeUserId, fakeVanId);
            throw new Error("Should have thrown NotFoundError");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("van not found");
        }
    }));
    it("throws SystemError if findById throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeVanId = new mongoose_1.Types.ObjectId().toString();
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        sinon_1.default.stub(data_1.Van, "findById").throws(new Error("DB error"));
        try {
            yield (0, getVanLocation_1.getVanLocation)(fakeUserId, fakeVanId);
            throw new Error("Should have thrown SystemError");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("DB error");
        }
    }));
    it("throws ValidationError if userId is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUserId = "not-valid";
        const validVanId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, getVanLocation_1.getVanLocation)(invalidUserId, validVanId);
            throw new Error("Should have thrown ValidationError");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
        }
    }));
});
