import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User, Location } from "../data";
import { registerUser } from "./index";
import { DuplicityError, LocationError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("registerUser", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([User.deleteMany({}), Location.deleteMany({})]);
  });

  afterEach(() => {
    return Promise.all([User.deleteMany({}), Location.deleteMany({})]);
  });

  after(() => {
    return data.disconnect();
  });

  it("registers a user successfully with full data", async () => {
    const input = {
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123123123",
      city: "Barcelona",
      country: "Spain",
      address: "Carrer Major",
      coordinates: [2.17, 41.38] as [2.17, 41.38],
    };

    await registerUser(input);

    const user = await User.findOne({ email: input.email });
    expect(user).to.exist;
    expect(user!.name).to.equal("Marc");
  });

  it("fails if email is duplicated", async () => {
    const input = {
      name: "Test",
      lastName: "User",
      email: "duplicate@test.com",
      password: "123123123",
      city: "Madrid",
      country: "Spain",
      address: "Gran Via",
      coordinates: [3.7, 40.4] as [3.7, 40.4],
    };

    await User.create({
      name: input.name,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
      location: new Types.ObjectId(),
    });

    try {
      await registerUser(input);
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(DuplicityError);
    }
  });

  it("throws LocationError if getCityCountryFromCoords fails", async () => {
    const input = {
      name: "Geo",
      lastName: "Error",
      email: "geoerror@test.com",
      password: "123123123",
      city: "",
      country: "",
      address: "Nowhere",
      coordinates: [0, 0] as [0, 0],
    };

    try {
      await registerUser(input);
    } catch (err) {
      expect(err as Error).to.be.instanceOf(LocationError);
    }
  });

  it("throws ValidationError if input is invalid", async () => {
    const input = {
      name: "Ma", // too short
      lastName: "",
      email: "notanemail",
      password: "123",
      city: "",
      country: "",
      address: "",
      coordinates: [0, 0],
    };

    try {
      await registerUser(input as any);
      throw new Error("Should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
    }
  });
});
