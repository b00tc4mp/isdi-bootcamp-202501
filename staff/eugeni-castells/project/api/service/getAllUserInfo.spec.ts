import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User, Van, Location } from "../data";

import { NotFoundError, SystemError, ValidationError } from "com/errors";
import { getAllUserInfo } from "./index";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("getAllUserInfo", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
    ]);
  });

  it("returns sanitized user info with location and vans", () => {
    let userId: Types.ObjectId;
    let locationId: Types.ObjectId;
    let vanId: Types.ObjectId;

    return Location.create({
      city: "Barcelona",
      country: "Catalunya",
    })
      .then((location) => {
        locationId = location._id;
        return User.create({
          name: "Marc",
          lastName: "Castellet",
          email: "marc@test.com",
          password: "123123",
          location: location._id,
          vans: [],
        });
      })
      .then((user) => {
        userId = user._id;
        return Van.create({
          model: "Transporter",
          brand: "VW",
          owner: userId,
          location: locationId,
          price: 300,
          year: new Date(),
          images: [],
          accessible: true,
          reviews: [],
          legal: [],
          trips: [],
          windows: 4,
          doors: 3,
          heating: true,
          airConditioning: false,
          bedCount: 2,
          insideKitchen: true,
          fridge: false,
          toilet: "fixed",
          shower: true,
          fuelType: "diesel",
          storage: 50,
        });
      })
      .then((van) => {
        vanId = van._id;
        return User.updateOne({ _id: userId }, { $push: { vans: vanId } });
      })
      .then(() => {
        return getAllUserInfo(userId.toString());
      })
      .then((result) => {
        expect(result).to.be.an("object");
        expect(result).to.have.property("id", userId.toString());
        expect(result).to.have.property("location");
        expect(result.location.city).to.equal("Barcelona");
        expect(result.location.country).to.equal("Catalunya");
        expect(result.vans).to.be.an("array").with.lengthOf(1);
        expect(result.vans[0].brand).to.equal("VW");
        expect(result.vans[0].location.city).to.equal("Barcelona");
      });
  });

  it("throws NotFoundError if user does not exist", () => {
    const fakeId = new Types.ObjectId().toString();

    return getAllUserInfo(fakeId).catch((err) => {
      expect(err).to.be.instanceOf(NotFoundError);
      expect(err.name).to.equal("NotFoundError");
      expect(err.message).to.equal("user not found");
    });
  });
  it("throws ValidationError if id is invalid", async () => {
    const brokenId = "invalid-object-id";

    try {
      await getAllUserInfo(brokenId);
      throw new Error("Expected function to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("invalid");
    }
  });

  it("returns user info correctly even if user has no vans", async () => {
    const location = await Location.create({
      city: "Lleida",
      country: "Spain",
    });

    const user = await User.create({
      name: "Sense",
      lastName: "Vans",
      email: "novans@test.com",
      password: "123",
      location: location._id,
      vans: [], // important
    });

    const result = await getAllUserInfo(user._id.toString());

    expect(result).to.have.property("id", user._id.toString());
    expect(result.vans).to.be.an("array").that.is.empty;
    expect(result.location.city).to.equal("Lleida");
  });

  it("throws SystemError if DB fails during findById", async () => {
    const original = User.findById;
    (User.findById as any) = () => ({
      populate: () => {
        throw new Error("Simulated populate error");
      },
    });

    try {
      await getAllUserInfo(new Types.ObjectId().toString());
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.include("Simulated populate error");
    } finally {
      User.findById = original;
    }
  });

  it("throws NotFoundError if user is not found after successful DB query", async () => {
    const original = User.findById;

    (User.findById as any) = () => ({
      populate: () => ({
        select: () => ({
          lean: () => Promise.resolve(null), // aquí es retorna null, no error
        }),
      }),
    });

    try {
      await getAllUserInfo(new Types.ObjectId().toString());
      throw new Error("Should have thrown");
    } catch (err) {
      // Ara ha d'agafar el !user i tirar el NotFoundError
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("user not found");
    } finally {
      User.findById = original;
    }
  });

  afterEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
    ]);
  });

  after(() => {
    return data.disconnect();
  });
});
