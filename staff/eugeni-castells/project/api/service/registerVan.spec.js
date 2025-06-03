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
require("dotenv/config");
const chai_1 = require("chai");
const mongoose_1 = require("mongoose");
const sinon_1 = __importDefault(require("sinon"));
const data_1 = require("../data");
const index_1 = require("./index");
const errors_1 = require("com/errors");
const uploadToFirebase_1 = require("../utils/uploadToFirebase");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
let uploadStub;
describe("registerVan", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        uploadStub = sinon_1.default
            .stub()
            .resolves([
            { url: "https://example.com/image.png", path: "path/image.png" },
        ]);
        // Substitueix la funció original amb el teu stub
        uploadToFirebase_1.uploadImagesToFirebase = uploadStub;
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Location.deleteMany({}),
        ]);
    });
    it("registers a van correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Carrer Major",
        });
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: location._id,
        });
        const newVanInfo = {
            model: "Ford Transit",
            brand: "Ford",
            price: 120,
            description: "Great van!!",
            features: {
                airConditioning: true,
                fridge: true,
                heating: true,
                insideKitchen: false,
                shower: true,
                toilet: "fixed",
            },
            traits: {
                accessible: false,
                bedCount: 2,
                doors: 3,
                fuelType: "diesel",
                maxTravellers: 4,
                storage: 100,
                windows: 4,
            },
        };
        const fakeImages = [{ path: "a.png" }];
        yield (0, index_1.registerVan)(user._id.toString(), newVanInfo, fakeImages);
        const vans = yield data_1.Van.find();
        (0, chai_1.expect)(vans).to.have.lengthOf(1);
        (0, chai_1.expect)(vans[0].brand).to.equal("Ford");
        (0, chai_1.expect)(vans[0].images[0].url).to.include("example.com");
    }));
    it("registers a van correctly even with no images", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Carrer sense fotos",
        });
        const user = yield data_1.User.create({
            name: "Sense",
            lastName: "Fotos",
            email: "fotos@test.com",
            password: "hashed",
            location: location._id,
        });
        const newVanInfo = {
            model: "Van Sense Imatges",
            brand: "Renault",
            price: 90,
            description: "No té imatges!",
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "petrol",
                maxTravellers: 2,
                storage: 50,
                windows: 3,
            },
        };
        yield (0, index_1.registerVan)(user._id.toString(), newVanInfo, []);
        const vans = yield data_1.Van.find();
        (0, chai_1.expect)(vans).to.have.lengthOf(1);
        (0, chai_1.expect)(vans[0].brand).to.equal("Renault");
    }));
    it("throws NotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        const dummyVan = {
            model: "VW",
            brand: "Volkswagen",
            description: "Great Van!",
            price: 100,
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)(fakeUserId, dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
        }
    }));
    it("throws ValidationError if userId is undefined", () => __awaiter(void 0, void 0, void 0, function* () {
        const dummyVan = {};
        try {
            yield (0, index_1.registerVan)(undefined, dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
        }
    }));
    it("throws ValidationError if malformed id", () => __awaiter(void 0, void 0, void 0, function* () {
        const dummyVan = {
            model: "VW",
            brand: "Volkswagen",
            description: "Great Van!",
            price: 100,
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)("invalid-id", dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
        }
    }));
    it("throws UploadFirebaseError if Firebase upload fails", () => __awaiter(void 0, void 0, void 0, function* () {
        uploadStub.rejects(new errors_1.UploadFirebaseError("Simulated Firebase error")); // reutilitzem el stub ja definit
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Catalunya",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Carrer Major",
        });
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: location._id,
        });
        const dummyVan = {
            model: "VW",
            brand: "Volkswagen",
            price: 100,
            description: "Great van!",
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)(user._id.toString(), dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.UploadFirebaseError);
        }
    }));
    it("throws SystemError if Van.create fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Ronda Universitat",
        });
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: location._id,
        });
        const createStub = sinon_1.default
            .stub(data_1.Van, "create")
            .throws(new Error("Create error"));
        const dummyVan = {
            model: "VW",
            brand: "Volkswagen",
            price: 100,
            description: "Create fail",
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)(user._id.toString(), dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("Create error");
        }
        finally {
            createStub.restore();
        }
    }));
    it("throws SystemError if User.updateOne fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Av Diagonal",
        });
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: location._id,
        });
        const updateStub = sinon_1.default
            .stub(data_1.User, "updateOne")
            .throws(new Error("Update failed"));
        const dummyVan = {
            model: "VW",
            brand: "Volkswagen",
            price: 100,
            description: "Update fail",
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)(user._id.toString(), dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("Update failed");
        }
        finally {
            updateStub.restore();
        }
    }));
    it("throws SystemError if van.save fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Passeig de Gracia",
        });
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: location._id,
        });
        const fakeVan = {
            _id: new mongoose_1.Types.ObjectId(),
            save: sinon_1.default.stub().throws(new Error("Save failed")),
        };
        const createStub = sinon_1.default.stub(data_1.Van, "create").resolves(fakeVan);
        uploadStub.resolves([
            { url: "https://example.com/img.png", path: "img.png" },
        ]);
        const dummyVan = {
            model: "VW",
            brand: "Volkswagen",
            price: 100,
            description: "Save fail",
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)(user._id.toString(), dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("Save failed");
        }
        finally {
            createStub.restore();
        }
    }));
    it("throws SystemError if uploadImagesToFirebase throws an unknown error", () => __awaiter(void 0, void 0, void 0, function* () {
        uploadStub.rejects(new Error("Unknown Firebase failure"));
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Rambla Catalunya",
        });
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: location._id,
        });
        const dummyVan = {
            model: "VW",
            brand: "Volkswagen",
            price: 100,
            description: "Unknown error test",
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)(user._id.toString(), dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("Unknown Firebase failure");
        }
    }));
    it("throws ValidationError if userId is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const dummyVan = {};
        try {
            yield (0, index_1.registerVan)("", dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("user id");
        }
    }));
    it("throws SystemError if User.findById throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const findStub = sinon_1.default
            .stub(data_1.User, "findById")
            .throws(new Error("Database error"));
        const dummyVan = {
            model: "VW",
            brand: "Volkswagen",
            price: 100,
            description: "Error test",
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)(new mongoose_1.Types.ObjectId().toString(), dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("Database error");
        }
        finally {
            findStub.restore();
        }
    }));
    it("throws SystemError if uploadImagesToFirebase throws a generic Error", () => __awaiter(void 0, void 0, void 0, function* () {
        uploadToFirebase_1.uploadImagesToFirebase.rejects(new Error("Generic failure"));
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "Av Meridiana",
        });
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "genericerror@test.com",
            password: "hashed",
            location: location._id,
        });
        const dummyVan = {
            model: "ErrorVan",
            brand: "Erronea",
            price: 100,
            description: "Simula error genèric a upload",
            features: {
                airConditioning: false,
                fridge: false,
                heating: false,
                insideKitchen: false,
                shower: false,
                toilet: "none",
            },
            traits: {
                accessible: false,
                bedCount: 1,
                doors: 2,
                fuelType: "diesel",
                maxTravellers: 2,
                storage: 30,
                windows: 2,
            },
        };
        try {
            yield (0, index_1.registerVan)(user._id.toString(), dummyVan, []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("Generic failure");
        }
    }));
    afterEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Location.deleteMany({}),
        ]);
    });
    after(() => data_1.data.disconnect());
});
