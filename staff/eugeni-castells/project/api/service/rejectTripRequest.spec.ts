import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User, Trip, Van, Location } from "../data";
import { rejectTripRequest } from "./index";
import { NotFoundError, OwnershipError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("rejectTripRequest", () => {
  before(() => data.connect(MONGO_URI!, MONGO_DB_TEST!));

  beforeEach(() =>
    Promise.all([
      User.deleteMany({}),
      Trip.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
    ])
  );

  it("successfully deletes a trip if user is owner", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Gran Via",
    });

    const owner = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123456",
      location: location._id,
    });

    const renter = await User.create({
      name: "Renter",
      lastName: "User",
      email: "renter@test.com",
      password: "123456",
      location: location._id,
    });

    const van = await Van.create({
      model: "T5",
      brand: "VW",
      location: location._id,
      owner: owner._id,
      windows: 4,
      doors: 3,
      bedCount: 2,
      fuelType: "diesel",
    });

    const trip = await Trip.create({
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-10"),
      van: van._id,
      renter: renter._id,
    });

    await rejectTripRequest(owner._id.toString(), trip._id.toString());

    const foundTrip = await Trip.findById(trip._id);
    expect(foundTrip).to.be.null;
  });

  it("throws NotFoundError if user does not exist", async () => {
    const fakeUserId = new Types.ObjectId().toString();
    const fakeTripId = new Types.ObjectId().toString();

    try {
      await rejectTripRequest(fakeUserId, fakeTripId);
      throw new Error("Expected to throw NotFoundError");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
    }
  });

  it("throws NotFoundError if trip does not exist", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Gran Via",
    });

    const owner = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123456",
      location: location._id,
    });

    const fakeTripId = new Types.ObjectId().toString();

    try {
      await rejectTripRequest(owner._id.toString(), fakeTripId);
      throw new Error("Expected to throw NotFoundError");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
    }
  });

  it("throws OwnershipError if user does not own the van", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Gran Via",
    });

    const owner = await User.create({
      name: "Owner",
      lastName: "User",
      email: "owner@test.com",
      password: "123456",
      location: location._id,
    });

    const renter = await User.create({
      name: "Renter",
      lastName: "User",
      email: "renter@test.com",
      password: "123456",
      location: location._id,
    });

    const van = await Van.create({
      model: "T5",
      brand: "VW",
      location: location._id,
      owner: renter._id,
      windows: 4,
      doors: 3,
      bedCount: 2,
      fuelType: "diesel",
    });

    const trip = await Trip.create({
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-10"),
      van: van._id,
      renter: renter._id,
    });

    try {
      await rejectTripRequest(owner._id.toString(), trip._id.toString());
      throw new Error("Expected to throw OwnershipError");
    } catch (err) {
      expect(err).to.be.instanceOf(OwnershipError);
    }
  });

  afterEach(() =>
    Promise.all([
      User.deleteMany({}),
      Trip.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
    ])
  );

  after(() => data.disconnect());
});
