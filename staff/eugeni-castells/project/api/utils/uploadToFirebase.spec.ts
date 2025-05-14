import { expect } from "chai";
import sinon from "sinon";

// ✅ Mockem abans de fer import de la funció que fa servir firebase.bucket
const fileStub = {
  save: sinon.stub(),
  makePublic: sinon.stub(),
  publicUrl: () => "https://example.com/vans/file.png",
};
const bucketStub = {
  file: sinon.stub().returns(fileStub),
};
sinon.stub(require("../firebase"), "bucket").value(bucketStub);

import { uploadImagesToFirebase } from "./uploadToFirebase";
import { UploadFirebaseError, SystemError } from "com/errors";

describe("uploadImagesToFirebase", () => {
  afterEach(() => {
    sinon.restore();
    fileStub.save.reset();
    fileStub.makePublic.reset();
    bucketStub.file.reset();
  });

  it("returns uploaded image info", async () => {
    fileStub.save.resolves();
    fileStub.makePublic.resolves();

    const fakeFile = {
      originalname: "file.png",
      mimetype: "image/png",
      buffer: Buffer.from(""),
    } as Express.Multer.File;

    const result = await uploadImagesToFirebase([fakeFile], "vans");

    expect(result).to.have.lengthOf(1);
    expect(result[0].url).to.equal("https://example.com/vans/file.png");
    expect(result[0].path).to.include("vans/");
  });

  it("throws UploadFirebaseError if save throws a Firebase error", async () => {
    fileStub.save.rejects({ code: "storage/unauthorized" });
    fileStub.makePublic.resolves();

    const fakeFile = {
      originalname: "file.png",
      mimetype: "image/png",
      buffer: Buffer.from(""),
    } as Express.Multer.File;

    try {
      await uploadImagesToFirebase([fakeFile], "vans");
      throw new Error("Should throw UploadFirebaseError");
    } catch (err) {
      expect(err).to.be.instanceOf(UploadFirebaseError);
    }
  });

  it("throws SystemError if makePublic throws a generic error", async () => {
    fileStub.save.resolves();
    fileStub.makePublic.rejects(new Error("generic failure"));

    const fakeFile = {
      originalname: "file.png",
      mimetype: "image/png",
      buffer: Buffer.from(""),
    } as Express.Multer.File;

    try {
      await uploadImagesToFirebase([fakeFile], "vans");
      throw new Error("Should throw SystemError");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("generic failure");
    }
  });
});
