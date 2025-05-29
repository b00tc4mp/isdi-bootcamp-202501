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
// ✅ Mockem abans de fer import de la funció que fa servir firebase.bucket
const fileStub = {
    save: sinon_1.default.stub(),
    makePublic: sinon_1.default.stub(),
    publicUrl: () => "https://example.com/vans/file.png",
};
const bucketStub = {
    file: sinon_1.default.stub().returns(fileStub),
};
sinon_1.default.stub(require("../firebase"), "bucket").value(bucketStub);
const uploadToFirebase_1 = require("./uploadToFirebase");
const errors_1 = require("com/errors");
describe("uploadImagesToFirebase", () => {
    afterEach(() => {
        sinon_1.default.restore();
        fileStub.save.reset();
        fileStub.makePublic.reset();
        bucketStub.file.reset();
    });
    it("returns uploaded image info", () => __awaiter(void 0, void 0, void 0, function* () {
        fileStub.save.resolves();
        fileStub.makePublic.resolves();
        const fakeFile = {
            originalname: "file.png",
            mimetype: "image/png",
            buffer: Buffer.from(""),
        };
        const result = yield (0, uploadToFirebase_1.uploadImagesToFirebase)([fakeFile], "vans");
        (0, chai_1.expect)(result).to.have.lengthOf(1);
        (0, chai_1.expect)(result[0].url).to.equal("https://example.com/vans/file.png");
        (0, chai_1.expect)(result[0].path).to.include("vans/");
    }));
    it("throws UploadFirebaseError if save throws a Firebase error", () => __awaiter(void 0, void 0, void 0, function* () {
        fileStub.save.rejects({ code: "storage/unauthorized" });
        fileStub.makePublic.resolves();
        const fakeFile = {
            originalname: "file.png",
            mimetype: "image/png",
            buffer: Buffer.from(""),
        };
        try {
            yield (0, uploadToFirebase_1.uploadImagesToFirebase)([fakeFile], "vans");
            throw new Error("Should throw UploadFirebaseError");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.UploadFirebaseError);
        }
    }));
    it("throws SystemError if makePublic throws a generic error", () => __awaiter(void 0, void 0, void 0, function* () {
        fileStub.save.resolves();
        fileStub.makePublic.rejects(new Error("generic failure"));
        const fakeFile = {
            originalname: "file.png",
            mimetype: "image/png",
            buffer: Buffer.from(""),
        };
        try {
            yield (0, uploadToFirebase_1.uploadImagesToFirebase)([fakeFile], "vans");
            throw new Error("Should throw SystemError");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.equal("generic failure");
        }
    }));
});
