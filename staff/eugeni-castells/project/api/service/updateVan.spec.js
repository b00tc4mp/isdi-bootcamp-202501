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
const uploadToFirebase_1 = require("../utils/uploadToFirebase");
const deleteFileFromFirebase_1 = require("../utils/deleteFileFromFirebase");
const firebaseErrorChecker_1 = require("../utils/firebaseErrorChecker");
const errors_1 = require("com/errors");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
let uploadStub;
let isFirebaseErrorStub;
let deleteStub;
// Assignar directament al mòdul importat (no al global)
const firebaseErrorCheckerModule = { isFirebaseError: firebaseErrorChecker_1.isFirebaseError };
// Substituir la funció original
before(() => {
    firebaseErrorCheckerModule.isFirebaseError =
        sinon_1.default.stub();
});
describe("updateVan", () => {
    before(() => data_1.data.connect(MONGO_URI, MONGO_DB_TEST));
    beforeEach(() => {
        isFirebaseErrorStub = sinon_1.default.stub();
        firebaseErrorCheckerModule.isFirebaseError =
            isFirebaseErrorStub;
        uploadStub = sinon_1.default
            .stub()
            .resolves([
            { url: "https://example.com/image.png", path: "path/image.png" },
        ]);
        deleteStub = sinon_1.default.stub().resolves();
        uploadToFirebase_1.uploadImagesToFirebase = uploadStub;
        deleteFileFromFirebase_1.deleteImagesFromFirebase = deleteStub;
        return Promise.all([
            data_1.User.deleteMany({}),
            data_1.Van.deleteMany({}),
            data_1.Location.deleteMany({}),
        ]);
    });
    it("updates a van successfully with image upload and deletion", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const van = yield data_1.Van.create({
            model: "Old Model",
            brand: "VW",
            price: 90,
            location: location._id,
            owner: user._id,
            images: [{ url: "https://old.com/img.jpg", path: "old/path.jpg" }],
            windows: 2,
            doors: 3,
            bedCount: 2,
            fuelType: "diesel",
        });
        user.vans.push(van._id);
        yield user.save();
        const updateInfo = {
            model: "New Model",
            brand: "VW",
            price: 100,
            description: "Updated",
            features: {
                heating: true,
                shower: true,
                airConditioning: true,
                insideKitchen: false,
                fridge: true,
                toilet: "fixed",
            },
            traits: {
                accessible: true,
                bedCount: 3,
                doors: 4,
                fuelType: "petrol",
                maxTravellers: 4,
                storage: 60,
                windows: 5,
            },
            imagesToDelete: ["old/path.jpg"],
        };
        const newFiles = [{ path: "newfile.png" }];
        yield (0, index_1.updateVan)(user._id.toString(), van._id.toString(), updateInfo, newFiles);
        const updatedVan = yield data_1.Van.findById(van._id);
        (0, chai_1.expect)(updatedVan).to.exist;
        (0, chai_1.expect)(updatedVan.model).to.equal("New Model");
        (0, chai_1.expect)(updatedVan.images).to.have.lengthOf(1);
        (0, chai_1.expect)(updatedVan.images[0].url).to.include("example.com");
    }));
    it("throws NotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const dummyId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.updateVan)(dummyId, dummyId, Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] }), []);
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
        }
    }));
    it("throws OwnershipError if user does not own the van", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "BCN",
            country: "CAT",
            point: { type: "Point", coordinates: [2.1, 41.3] },
            address: "Test",
        });
        const owner = yield data_1.User.create({
            name: "Owner",
            email: "owner@test.com",
            password: "123",
            location: location._id,
        });
        const stranger = yield data_1.User.create({
            name: "Stranger",
            email: "stranger@test.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Van",
            brand: "Brand",
            owner: owner._id,
            location: location._id,
            windows: 1,
            doors: 1,
            bedCount: 1,
            fuelType: "diesel",
        });
        try {
            yield (0, index_1.updateVan)(stranger._id.toString(), van._id.toString(), Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] }), []);
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.OwnershipError);
        }
    }));
    it("throws SystemError if Van.findById throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const stub = sinon_1.default.stub(data_1.Van, "findById").throws(new Error("DB error"));
        const fakeId = new mongoose_1.Types.ObjectId().toString();
        const user = yield data_1.User.create({
            name: "Test",
            email: "test@test.com",
            password: "123",
            location: yield data_1.Location.create({
                city: "BBB",
                country: "CCCCC",
                point: { type: "Point", coordinates: [1, 1] },
                address: "Test",
            }),
        });
        try {
            yield (0, index_1.updateVan)(user._id.toString(), fakeId, Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] }), []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("DB error");
        }
        finally {
            stub.restore();
        }
    }));
    it("throws NotFoundError if van does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Test",
            country: "Test",
            point: { type: "Point", coordinates: [1, 1] },
            address: "Test",
        });
        const user = yield data_1.User.create({
            name: "Test",
            email: "test@test.com",
            password: "123",
            location: location._id,
        });
        const nonExistentVanId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.updateVan)(user._id.toString(), nonExistentVanId, Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] }), []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("van not found");
        }
    }));
    it("throws SystemError if Van.updateOne fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const stub = sinon_1.default
            .stub(data_1.Van, "updateOne")
            .throws(new Error("update failed"));
        const location = yield data_1.Location.create({
            city: "XXXX",
            country: "XXXX",
            point: { type: "Point", coordinates: [1, 1] },
            address: "XXXXX",
        });
        const user = yield data_1.User.create({
            name: "XXXX",
            email: "x@test.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "XXXX",
            brand: "XXXXX",
            owner: user._id,
            location: location._id,
            windows: 1,
            doors: 1,
            bedCount: 1,
            fuelType: "diesel",
        });
        user.vans.push(van._id);
        yield user.save();
        try {
            yield (0, index_1.updateVan)(user._id.toString(), van._id.toString(), Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] }), []);
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("update failed");
        }
        finally {
            stub.restore();
        }
    }));
    it("does not upload images if imagesToUpload is undefined", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "C/ Test",
        });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@test.com",
            password: "hashed",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Model",
            brand: "Brand",
            owner: user._id,
            location: location._id,
            windows: 1,
            doors: 1,
            bedCount: 1,
            fuelType: "diesel",
        });
        user.vans.push(van._id);
        yield user.save();
        const updateInfo = Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] });
        yield (0, index_1.updateVan)(user._id.toString(), van._id.toString(), updateInfo, undefined);
        (0, chai_1.expect)(uploadStub.called).to.be.false;
    }));
    it("does not delete images if imagesToDelete is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
            address: "C/ Test",
        });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@test.com",
            password: "hashed",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Model",
            brand: "Brand",
            owner: user._id,
            location: location._id,
            windows: 1,
            doors: 1,
            bedCount: 1,
            fuelType: "diesel",
        });
        user.vans.push(van._id);
        yield user.save();
        const updateInfo = Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] });
        const newFiles = [{ path: "image.png" }];
        yield (0, index_1.updateVan)(user._id.toString(), van._id.toString(), updateInfo, newFiles);
        (0, chai_1.expect)(deleteStub.called).to.be.false;
    }));
    it("throws SystemError if van.save fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const location = yield data_1.Location.create({
            city: "Test",
            country: "Test",
            point: { type: "Point", coordinates: [1, 1] },
            address: "Test",
        });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@test.com",
            password: "hashed",
            location: location._id,
        });
        const fakeVan = {
            _id: new mongoose_1.Types.ObjectId(),
            save: sinon_1.default.stub().throws(new Error("save failed")),
            images: [],
        };
        const createStub = sinon_1.default.stub(data_1.Van, "findById").resolves(fakeVan);
        const updateInfo = Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] });
        user.vans.push(fakeVan._id);
        yield user.save();
        try {
            yield (0, index_1.updateVan)(user._id.toString(), fakeVan._id.toString(), updateInfo, []);
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("save failed");
        }
        finally {
            createStub.restore();
        }
    }));
    it("throws SystemError if deleteImagesFromFirebase fails with non-Firebase error", () => __awaiter(void 0, void 0, void 0, function* () {
        deleteStub.rejects(new Error("Generic delete error"));
        const location = yield data_1.Location.create({
            city: "Test",
            country: "Test",
            point: { type: "Point", coordinates: [1, 1] },
            address: "Test",
        });
        const user = yield data_1.User.create({
            name: "User",
            email: "user@test.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Model",
            brand: "Brand",
            owner: user._id,
            location: location._id,
            windows: 1,
            doors: 2,
            bedCount: 2,
            fuelType: "diesel",
        });
        user.vans.push(van._id);
        yield user.save();
        const updateInfo = Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: ["toDelete.png"] });
        try {
            yield (0, index_1.updateVan)(user._id.toString(), van._id.toString(), updateInfo, []);
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("Generic delete error");
        }
    }));
    it("throws SystemError if uploadImagesToFirebase fails with non-Firebase error", () => __awaiter(void 0, void 0, void 0, function* () {
        uploadStub.rejects(new Error("Generic upload error"));
        const location = yield data_1.Location.create({
            city: "Test",
            country: "Test",
            point: { type: "Point", coordinates: [1, 1] },
            address: "Test",
        });
        const user = yield data_1.User.create({
            name: "Marc",
            email: "marc@test.com",
            password: "123",
            location: location._id,
        });
        const van = yield data_1.Van.create({
            model: "Van",
            brand: "VW",
            owner: user._id,
            location: location._id,
            windows: 2,
            doors: 3,
            bedCount: 2,
            fuelType: "diesel",
        });
        user.vans.push(van._id);
        yield user.save();
        const updateInfo = Object.assign(Object.assign({}, defaultVanInfo()), { imagesToDelete: [] });
        try {
            yield (0, index_1.updateVan)(user._id.toString(), van._id.toString(), updateInfo, [
                { path: "error.png" },
            ]);
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("Generic upload error");
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
function defaultVanInfo() {
    return {
        model: "Base",
        brand: "Brand",
        price: 100,
        description: "Updated",
        features: {
            heating: false,
            shower: false,
            airConditioning: false,
            insideKitchen: false,
            fridge: false,
            toilet: "none",
        },
        traits: {
            accessible: false,
            bedCount: 1,
            doors: 2,
            fuelType: "diesel",
            maxTravellers: 2,
            storage: 50,
            windows: 3,
        },
    };
}
