import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import sinon from "sinon";
import { data, User, Van, Location } from "../data";
import { registerVan } from "./index";
import { RegisterVanParam } from "com/types";
import {
  NotFoundError,
  SystemError,
  UploadFirebaseError,
  ValidationError,
} from "com/errors";
import { uploadImagesToFirebase } from "../utils/uploadToFirebase";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

let uploadStub: sinon.SinonStub;

describe("registerVan", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    uploadStub = sinon
      .stub()
      .resolves([
        { url: "https://example.com/image.png", path: "path/image.png" },
      ]);

    // Substitueix la funció original amb el teu stub
    (uploadImagesToFirebase as unknown as sinon.SinonStub) = uploadStub;

    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
    ]);
  });

  it("registers a van correctly", async () => {
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

    const newVanInfo: RegisterVanParam = {
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

    const fakeImages = [{ path: "a.png" }] as Express.Multer.File[];

    await registerVan(user._id.toString(), newVanInfo, fakeImages);

    const vans = await Van.find();
    expect(vans).to.have.lengthOf(1);
    expect(vans[0].brand).to.equal("Ford");
    expect(vans[0].images[0].url).to.include("example.com");
  });

  it("registers a van correctly even with no images", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Carrer sense fotos",
    });

    const user = await User.create({
      name: "Sense",
      lastName: "Fotos",
      email: "fotos@test.com",
      password: "hashed",
      location: location._id,
    });

    const newVanInfo: RegisterVanParam = {
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

    await registerVan(user._id.toString(), newVanInfo, []);

    const vans = await Van.find();
    expect(vans).to.have.lengthOf(1);
    expect(vans[0].brand).to.equal("Renault");
  });

  it("throws NotFoundError if user does not exist", async () => {
    const fakeUserId = new Types.ObjectId().toString();
    const dummyVan: RegisterVanParam = {
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
      await registerVan(fakeUserId, dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
    }
  });

  it("throws ValidationError if userId is undefined", async () => {
    const dummyVan = {} as RegisterVanParam;

    try {
      await registerVan(undefined as unknown as string, dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
    }
  });

  it("throws ValidationError if malformed id", async () => {
    const dummyVan: RegisterVanParam = {
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
      await registerVan("invalid-id", dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
    }
  });

  it("throws UploadFirebaseError if Firebase upload fails", async () => {
    uploadStub.rejects(new UploadFirebaseError("Simulated Firebase error")); // reutilitzem el stub ja definit

    const location = await Location.create({
      city: "Barcelona",
      country: "Catalunya",
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

    const dummyVan: RegisterVanParam = {
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
      await registerVan(user._id.toString(), dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(UploadFirebaseError);
    }
  });

  it("throws SystemError if Van.create fails", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Ronda Universitat",
    });

    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: location._id,
    });

    const createStub = sinon
      .stub(Van, "create")
      .throws(new Error("Create error"));

    const dummyVan: RegisterVanParam = {
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
      await registerVan(user._id.toString(), dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("Create error");
    } finally {
      createStub.restore();
    }
  });

  it("throws SystemError if User.updateOne fails", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Av Diagonal",
    });

    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: location._id,
    });

    const updateStub = sinon
      .stub(User, "updateOne")
      .throws(new Error("Update failed"));

    const dummyVan: RegisterVanParam = {
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
      await registerVan(user._id.toString(), dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("Update failed");
    } finally {
      updateStub.restore();
    }
  });

  it("throws SystemError if van.save fails", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Passeig de Gracia",
    });

    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: location._id,
    });

    const fakeVan: any = {
      _id: new Types.ObjectId(),
      save: sinon.stub().throws(new Error("Save failed")),
    };

    const createStub = sinon.stub(Van, "create").resolves(fakeVan);
    uploadStub.resolves([
      { url: "https://example.com/img.png", path: "img.png" },
    ]);
    const dummyVan: RegisterVanParam = {
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
      await registerVan(user._id.toString(), dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("Save failed");
    } finally {
      createStub.restore();
    }
  });
  it("throws SystemError if uploadImagesToFirebase throws an unknown error", async () => {
    uploadStub.rejects(new Error("Unknown Firebase failure"));
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Rambla Catalunya",
    });

    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: location._id,
    });

    const dummyVan: RegisterVanParam = {
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
      await registerVan(user._id.toString(), dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("Unknown Firebase failure");
    }
  });

  it("throws ValidationError if userId is empty", async () => {
    const dummyVan = {} as RegisterVanParam;
    try {
      await registerVan("", dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("user id");
    }
  });

  it("throws SystemError if User.findById throws", async () => {
    const findStub = sinon
      .stub(User, "findById")
      .throws(new Error("Database error"));

    const dummyVan: RegisterVanParam = {
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
      await registerVan(new Types.ObjectId().toString(), dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("Database error");
    } finally {
      findStub.restore();
    }
  });

  it("throws SystemError if uploadImagesToFirebase throws a generic Error", async () => {
    (uploadImagesToFirebase as unknown as sinon.SinonStub).rejects(
      new Error("Generic failure")
    );

    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Av Meridiana",
    });

    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "genericerror@test.com",
      password: "hashed",
      location: location._id,
    });

    const dummyVan: RegisterVanParam = {
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
      await registerVan(user._id.toString(), dummyVan, []);
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.equal("Generic failure");
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
