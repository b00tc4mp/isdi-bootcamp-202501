import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User, Van, Trip } from "../data";
import { NotFoundError } from "com/errors";
import { deleteVanById } from "./index";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("deleteVanById", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Trip.deleteMany({}),
    ]);
  });

  it("deletes a van and pending trips successfully", () => {
    let userId: Types.ObjectId;
    let vanId: Types.ObjectId;
    let tripId: Types.ObjectId;

    return User.create({
      name: "Owner",
      email: "owner@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    })
      .then((user) => {
        userId = user._id;
        return Van.create({
          model: "TestVan",
          brand: "TestBrand",
          year: new Date(),
          images: [],
          accessible: false,
          price: 100,
          location: new Types.ObjectId(),
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
          User.updateOne({ _id: userId }, { $push: { vans: vanId } }),
          Trip.create({
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
        return deleteVanById(userId.toString(), vanId.toString());
      })
      .then(() => {
        return Promise.all([
          Van.findById(vanId),
          Trip.findById(tripId),
          User.findById(userId),
        ]);
      })
      .then(([van, trip, user]) => {
        expect(van).to.be.null;
        expect(trip).to.be.null;
        expect(user?.vans).to.not.include(vanId);
      });
  });

  it("throws NotFoundError if user does not exist", () => {
    const fakeUserId = new Types.ObjectId().toString();
    const fakeVanId = new Types.ObjectId().toString();

    return deleteVanById(fakeUserId, fakeVanId).catch((err) => {
      expect(err).to.be.instanceOf(NotFoundError);
      expect(err.message).to.equal("user not found");
    });
  });

  it("throws NotFoundError if van does not exist", () => {
    return User.create({
      name: "Tester",
      email: "t@t.com",
      password: "123123123",
      location: new Types.ObjectId(),
    })
      .then((user) => {
        return deleteVanById(
          user._id.toString(),
          new Types.ObjectId().toString()
        );
      })
      .catch((err) => {
        expect(err).to.be.instanceOf(NotFoundError);
        expect(err.message).to.equal("van not found");
      });
  });

  it("throws ValidationError for invalid userId", async () => {
    try {
      await deleteVanById("invalid-id", new Types.ObjectId().toString());
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("ValidationError");
    }
  });

  it("throws ValidationError for invalid vanId", async () => {
    try {
      await deleteVanById(new Types.ObjectId().toString(), "invalid-id");
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("ValidationError");
    }
  });

  it("throws SystemError if Trip.find fails", async () => {
    const user = await User.create({
      name: "Test",
      email: "test@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "TestVan",
      brand: "TestBrand",
      year: new Date(),
      images: [],
      accessible: false,
      price: 100,
      location: new Types.ObjectId(),
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

    await User.updateOne({ _id: user._id }, { $push: { vans: van._id } });

    const originalFind = Trip.find;
    (Trip.find as any) = () => {
      throw new Error("Simulated DB failure on Trip.find");
    };

    try {
      await deleteVanById(user._id.toString(), van._id.toString());
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("SystemError");
    } finally {
      Trip.find = originalFind;
    }
  });

  afterEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Trip.deleteMany({}),
    ]);
  });

  after(() => {
    return data.disconnect();
  });
});
