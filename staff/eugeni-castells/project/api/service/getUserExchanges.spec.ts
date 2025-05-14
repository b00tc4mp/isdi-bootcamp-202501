import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User, Trip, Van } from "../data";
import { getUserExchanges } from "./index";
import { NotFoundError, ValidationError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("getUserExchanges", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Trip.deleteMany({}),
      Van.deleteMany({}),
    ]);
  });

  it("returns accepted and pending trips separated by role", async () => {
    const renter = await User.create({
      name: "Marc",
      lastName: "Renter",
      email: "renter@test.com",
      password: "123123",
      location: new Types.ObjectId(),
    });

    const owner = await User.create({
      name: "Anna",
      lastName: "Owner",
      email: "owner@test.com",
      password: "123123",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "California",
      brand: "VW",
      location: new Types.ObjectId(),
      price: 300,
      owner: owner._id,
      images: [],
      windows: 2,
      doors: 3,
      heating: false,
      airConditioning: false,
      bedCount: 2,
      fuelType: "diesel",
    });

    const acceptedTrip = await Trip.create({
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-10"),
      van: van._id,
      renter: renter._id,
      confirmStatus: "accepted",
      paymentMethod: "currency",
      paymentStatus: "payed",
    });

    const pendingTrip = await Trip.create({
      startDate: new Date("2025-07-01"),
      endDate: new Date("2025-07-10"),
      van: van._id,
      renter: renter._id,
      confirmStatus: "pending",
      paymentMethod: "currency",
      paymentStatus: "pending",
    });

    await User.findByIdAndUpdate(renter._id, {
      $push: { trips: [acceptedTrip._id, pendingTrip._id] },
    });

    const result = await getUserExchanges(renter._id.toString());

    expect(result).to.have.property("trips");
    expect(result.trips.all).to.have.lengthOf(1);
    expect(result.trips.user).to.have.lengthOf(1);
    expect(result.trips.vans).to.have.lengthOf(0);

    expect(result).to.have.property("pendingRequests");
    expect(result.pendingRequests.all).to.have.lengthOf(1);
    expect(result.pendingRequests.user).to.have.lengthOf(1);
    expect(result.pendingRequests.toUser).to.have.lengthOf(0);
  });

  it("returns empty arrays when user has no trips", async () => {
    const user = await User.create({
      name: "Empty",
      lastName: "User",
      email: "empty@test.com",
      password: "123123",
      location: new Types.ObjectId(),
    });

    const result = await getUserExchanges(user._id.toString());

    expect(result.trips.all).to.have.lengthOf(0);
    expect(result.trips.user).to.have.lengthOf(0);
    expect(result.trips.vans).to.have.lengthOf(0);

    expect(result.pendingRequests.all).to.have.lengthOf(0);
    expect(result.pendingRequests.user).to.have.lengthOf(0);
    expect(result.pendingRequests.toUser).to.have.lengthOf(0);
  });

  it("throws NotFoundError if user does not exist", () => {
    const fakeId = new Types.ObjectId().toString();
    return getUserExchanges(fakeId).catch((err) => {
      expect(err).to.be.instanceOf(NotFoundError);
      expect(err.message).to.equal("user not found");
    });
  });

  it("throws ValidationError if userId is invalid", async () => {
    try {
      await getUserExchanges("invalid-id");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("invalid");
    }
  });

  it("returns empty trips arrays if no trip is accepted", async () => {
    const user = await User.create({
      name: "Reject",
      lastName: "Only",
      email: "reject@test.com",
      password: "123123",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "Solo",
      brand: "Fiat",
      location: new Types.ObjectId(),
      price: 300,
      owner: user._id,
      windows: 2,
      doors: 3,
      heating: false,
      airConditioning: false,
      bedCount: 2,
      fuelType: "diesel",
      images: [],
    });

    const rejectedTrip = await Trip.create({
      startDate: new Date(),
      endDate: new Date(),
      van: van._id,
      renter: user._id,
      confirmStatus: "rejected",
      paymentMethod: "currency",
      paymentStatus: "pending",
    });

    await User.findByIdAndUpdate(user._id, {
      $push: { trips: [rejectedTrip._id] },
    });

    const result = await getUserExchanges(user._id.toString());
    expect(result.trips.all).to.have.lengthOf(0);
    expect(result.trips.user).to.have.lengthOf(0);
    expect(result.trips.vans).to.have.lengthOf(0);
  });

  it("returns empty pendingRequests if there are only accepted trips", async () => {
    const renter = await User.create({
      name: "Renter",
      email: "onlyaccepted@test.com",
      password: "123123",
      location: new Types.ObjectId(),
    });

    const owner = await User.create({
      name: "Owner",
      email: "acceptedowner@test.com",
      password: "123123",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "Ocean",
      brand: "VW",
      location: new Types.ObjectId(),
      price: 200,
      owner: owner._id,
      windows: 2,
      doors: 2,
      heating: true,
      airConditioning: true,
      bedCount: 2,
      fuelType: "diesel",
      images: [],
    });

    const acceptedTrip = await Trip.create({
      startDate: new Date(),
      endDate: new Date(),
      van: van._id,
      renter: renter._id,
      confirmStatus: "accepted",
      paymentMethod: "currency",
      paymentStatus: "payed",
    });

    await User.findByIdAndUpdate(renter._id, {
      $push: { trips: [acceptedTrip._id] },
    });

    const result = await getUserExchanges(renter._id.toString());
    expect(result.pendingRequests.all).to.have.lengthOf(0);
    expect(result.pendingRequests.user).to.have.lengthOf(0);
    expect(result.pendingRequests.toUser).to.have.lengthOf(0);
  });

  it("returns pending request from others to user if user is owner", async () => {
    const owner = await User.create({
      name: "Owner",
      email: "owner@toyou.com",
      password: "123",
      location: new Types.ObjectId(),
    });

    const renter = await User.create({
      name: "Guest",
      email: "guest@trip.com",
      password: "123",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "T6",
      brand: "VW",
      location: new Types.ObjectId(),
      price: 100,
      owner: owner._id,
      windows: 2,
      doors: 3,
      heating: false,
      airConditioning: true,
      bedCount: 2,
      fuelType: "diesel",
      images: [],
    });

    const pendingTrip = await Trip.create({
      startDate: new Date(),
      endDate: new Date(),
      van: van._id,
      renter: renter._id,
      confirmStatus: "pending",
      paymentMethod: "currency",
      paymentStatus: "pending",
    });

    await User.findByIdAndUpdate(owner._id, {
      $push: { trips: [pendingTrip._id] },
    });

    const result = await getUserExchanges(owner._id.toString());
    expect(result.pendingRequests.toUser).to.have.lengthOf(1);
  });

  afterEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Trip.deleteMany({}),
      Van.deleteMany({}),
    ]);
  });

  after(() => {
    return data.disconnect();
  });
});
