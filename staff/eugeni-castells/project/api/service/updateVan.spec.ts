import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import sinon from "sinon";
import { data, User, Van, Location } from "../data";
import { updateVan } from "./index";
import { uploadImagesToFirebase } from "../utils/uploadToFirebase";
import { deleteImagesFromFirebase } from "../utils/deleteFileFromFirebase";
import { isFirebaseError } from "../utils/firebaseErrorChecker";
import { UpdateVanParam } from "com/types";
import {
  NotFoundError,
  OwnershipError,
  SystemError,
  UploadFirebaseError,
} from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

let uploadStub: sinon.SinonStub;
let isFirebaseErrorStub: sinon.SinonStub;
let deleteStub: sinon.SinonStub;

// Assignar directament al mòdul importat (no al global)
const firebaseErrorCheckerModule = { isFirebaseError };

// Substituir la funció original
before(() => {
  (firebaseErrorCheckerModule.isFirebaseError as unknown as sinon.SinonStub) =
    sinon.stub();
});

describe("updateVan", () => {
  before(() => data.connect(MONGO_URI!, MONGO_DB_TEST!));

  beforeEach(() => {
    isFirebaseErrorStub = sinon.stub();
    (firebaseErrorCheckerModule.isFirebaseError as unknown as sinon.SinonStub) =
      isFirebaseErrorStub;

    uploadStub = sinon
      .stub()
      .resolves([
        { url: "https://example.com/image.png", path: "path/image.png" },
      ]);
    deleteStub = sinon.stub().resolves();

    (uploadImagesToFirebase as unknown as sinon.SinonStub) = uploadStub;
    (deleteImagesFromFirebase as unknown as sinon.SinonStub) = deleteStub;

    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
    ]);
  });

  it("updates a van successfully with image upload and deletion", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Carrer Major",
    });

    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: location._id,
    });

    const van = await Van.create({
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
    await user.save();

    const updateInfo: UpdateVanParam = {
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

    const newFiles = [{ path: "newfile.png" }] as Express.Multer.File[];

    await updateVan(
      user._id.toString(),
      van._id.toString(),
      updateInfo,
      newFiles
    );

    const updatedVan = await Van.findById(van._id);
    expect(updatedVan).to.exist;
    expect(updatedVan!.model).to.equal("New Model");
    expect(updatedVan!.images).to.have.lengthOf(1);
    expect(updatedVan!.images[0].url).to.include("example.com");
  });

  it("throws NotFoundError if user does not exist", async () => {
    const dummyId = new Types.ObjectId().toString();
    try {
      await updateVan(
        dummyId,
        dummyId,
        { ...defaultVanInfo(), imagesToDelete: [] },
        []
      );
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
    }
  });

  it("throws OwnershipError if user does not own the van", async () => {
    const location = await Location.create({
      city: "BCN",
      country: "CAT",
      point: { type: "Point", coordinates: [2.1, 41.3] },
      address: "Test",
    });

    const owner = await User.create({
      name: "Owner",
      email: "owner@test.com",
      password: "123",
      location: location._id,
    });

    const stranger = await User.create({
      name: "Stranger",
      email: "stranger@test.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
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
      await updateVan(
        stranger._id.toString(),
        van._id.toString(),
        { ...defaultVanInfo(), imagesToDelete: [] },
        []
      );
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(OwnershipError);
    }
  });

  it("throws SystemError if Van.findById throws", async () => {
    const stub = sinon.stub(Van, "findById").throws(new Error("DB error"));
    const fakeId = new Types.ObjectId().toString();

    const user = await User.create({
      name: "Test",
      email: "test@test.com",
      password: "123",
      location: await Location.create({
        city: "BBB",
        country: "CCCCC",
        point: { type: "Point", coordinates: [1, 1] },
        address: "Test",
      }),
    });

    try {
      await updateVan(
        user._id.toString(),
        fakeId,
        { ...defaultVanInfo(), imagesToDelete: [] },
        []
      );
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("DB error");
    } finally {
      stub.restore();
    }
  });

  it("throws NotFoundError if van does not exist", async () => {
    const location = await Location.create({
      city: "Test",
      country: "Test",
      point: { type: "Point", coordinates: [1, 1] },
      address: "Test",
    });

    const user = await User.create({
      name: "Test",
      email: "test@test.com",
      password: "123",
      location: location._id,
    });

    const nonExistentVanId = new Types.ObjectId().toString();

    try {
      await updateVan(
        user._id.toString(),
        nonExistentVanId,
        {
          ...defaultVanInfo(),
          imagesToDelete: [],
        },
        []
      );
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("van not found");
    }
  });

  it("throws SystemError if Van.updateOne fails", async () => {
    const stub = sinon
      .stub(Van, "updateOne")
      .throws(new Error("update failed"));

    const location = await Location.create({
      city: "XXXX",
      country: "XXXX",
      point: { type: "Point", coordinates: [1, 1] },
      address: "XXXXX",
    });

    const user = await User.create({
      name: "XXXX",
      email: "x@test.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
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
    await user.save();

    try {
      await updateVan(
        user._id.toString(),
        van._id.toString(),
        {
          ...defaultVanInfo(),
          imagesToDelete: [],
        },
        []
      );
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("update failed");
    } finally {
      stub.restore();
    }
  });
  it("does not upload images if imagesToUpload is undefined", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "C/ Test",
    });

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: "hashed",
      location: location._id,
    });

    const van = await Van.create({
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
    await user.save();

    const updateInfo = { ...defaultVanInfo(), imagesToDelete: [] };

    await updateVan(
      user._id.toString(),
      van._id.toString(),
      updateInfo,
      undefined as any
    );

    expect(uploadStub.called).to.be.false;
  });

  it("does not delete images if imagesToDelete is empty", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "C/ Test",
    });

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: "hashed",
      location: location._id,
    });

    const van = await Van.create({
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
    await user.save();

    const updateInfo = { ...defaultVanInfo(), imagesToDelete: [] };
    const newFiles = [{ path: "image.png" }] as Express.Multer.File[];

    await updateVan(
      user._id.toString(),
      van._id.toString(),
      updateInfo,
      newFiles
    );

    expect(deleteStub.called).to.be.false;
  });

  it("throws SystemError if van.save fails", async () => {
    const location = await Location.create({
      city: "Test",
      country: "Test",
      point: { type: "Point", coordinates: [1, 1] },
      address: "Test",
    });

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: "hashed",
      location: location._id,
    });

    const fakeVan: any = {
      _id: new Types.ObjectId(),
      save: sinon.stub().throws(new Error("save failed")),
      images: [],
    };

    const createStub = sinon.stub(Van, "findById").resolves(fakeVan);

    const updateInfo = {
      ...defaultVanInfo(),
      imagesToDelete: [],
    };

    user.vans.push(fakeVan._id);
    await user.save();

    try {
      await updateVan(
        user._id.toString(),
        fakeVan._id.toString(),
        updateInfo,
        []
      );
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("save failed");
    } finally {
      createStub.restore();
    }
  });

  it("throws SystemError if deleteImagesFromFirebase fails with non-Firebase error", async () => {
    deleteStub.rejects(new Error("Generic delete error"));

    const location = await Location.create({
      city: "Test",
      country: "Test",
      point: { type: "Point", coordinates: [1, 1] },
      address: "Test",
    });

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
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
    await user.save();

    const updateInfo = {
      ...defaultVanInfo(),
      imagesToDelete: ["toDelete.png"],
    };

    try {
      await updateVan(user._id.toString(), van._id.toString(), updateInfo, []);
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("Generic delete error");
    }
  });

  it("throws SystemError if uploadImagesToFirebase fails with non-Firebase error", async () => {
    uploadStub.rejects(new Error("Generic upload error"));

    const location = await Location.create({
      city: "Test",
      country: "Test",
      point: { type: "Point", coordinates: [1, 1] },
      address: "Test",
    });

    const user = await User.create({
      name: "Marc",
      email: "marc@test.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
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
    await user.save();

    const updateInfo = {
      ...defaultVanInfo(),
      imagesToDelete: [],
    };

    try {
      await updateVan(user._id.toString(), van._id.toString(), updateInfo, [
        { path: "error.png" },
      ] as any);
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("Generic upload error");
    }
  });

  afterEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
    ]);
  });

  after(() => data.disconnect());
});

function defaultVanInfo(): Omit<UpdateVanParam, "imagesToDelete"> {
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
