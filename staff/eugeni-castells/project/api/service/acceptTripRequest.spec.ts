import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User, Trip, Van, Chat } from "../data";
import { NotFoundError } from "com/errors";
import { acceptTripRequest } from "./index";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("acceptTripRequest", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Trip.deleteMany({}),
      Chat.deleteMany({}),
    ]);
  });

  it("accepts a trip and creates chat between owner and renter", async () => {
    const owner = await User.create({
      name: "Owner",
      lastName: "Vanlord",
      email: "owner@example.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const renter = await User.create({
      name: "Renter",
      lastName: "Guest",
      email: "renter@example.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "T6",
      brand: "VW",
      year: new Date(2021, 0, 1),
      images: [],
      accessible: false,
      price: 250,
      location: new Types.ObjectId(),
      legal: [],
      trips: [],
      windows: 4,
      doors: 3,
      heating: false,
      airConditioning: false,
      bedCount: 2,
      insideKitchen: true,
      fridge: true,
      toilet: "portable",
      shower: false,
      fuelType: "diesel",
      storage: 150,
      owner: owner._id,
    });

    const trip = await Trip.create({
      startDate: new Date(),
      endDate: new Date(),
      van: van._id,
      renter: renter._id,
      issues: [],
      paymentStatus: "pending",
      paymentMethod: "currency",
      confirmStatus: "pending",
      price: 250,
      agreements: [],
    });

    await acceptTripRequest(owner._id.toString(), trip._id.toString());

    const updatedTrip = await Trip.findById(trip._id);
    const createdChats = await Chat.find({
      participants: { $all: [owner._id, renter._id] },
    });

    expect(updatedTrip?.confirmStatus).to.equal("accepted");
    expect(createdChats).to.have.lengthOf(1);
  });

  it("does not create chat if renter is also the owner", async () => {
    const user = await User.create({
      name: "Solo",
      lastName: "Traveler",
      email: "solo@example.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "Sprinter",
      brand: "Mercedes",
      year: new Date(2020, 0, 1),
      images: [],
      accessible: true,
      price: 200,
      location: new Types.ObjectId(),
      legal: [],
      trips: [],
      windows: 3,
      doors: 3,
      heating: true,
      airConditioning: true,
      bedCount: 2,
      insideKitchen: true,
      fridge: true,
      toilet: "fixed",
      shower: true,
      fuelType: "diesel",
      storage: 100,
      owner: user._id,
    });

    const trip = await Trip.create({
      startDate: new Date(),
      endDate: new Date(),
      van: van._id,
      renter: user._id,
      issues: [],
      paymentStatus: "pending",
      paymentMethod: "currency",
      confirmStatus: "pending",
      price: 200,
      agreements: [],
    });

    await acceptTripRequest(user._id.toString(), trip._id.toString());

    const updatedTrip = await Trip.findById(trip._id);
    const chats = await Chat.find({});

    expect(updatedTrip?.confirmStatus).to.equal("accepted");
    expect(chats).to.have.lengthOf(0);
  });

  it("fails because user not found", async () => {
    const fakeId = new Types.ObjectId();
    const trip = await Trip.create({
      startDate: new Date(),
      endDate: new Date(),
      van: fakeId,
      renter: fakeId,
      issues: [],
      paymentStatus: "pending",
      paymentMethod: "currency",
      confirmStatus: "pending",
      price: 200,
      agreements: [],
    });

    try {
      await acceptTripRequest(fakeId.toString(), trip._id.toString());
    } catch (error) {
      expect(error as Error).to.be.instanceOf(NotFoundError);
      expect((error as Error).message).to.equal("user not found");
    }
  });

  it("fails because trip not found", async () => {
    const user = await User.create({
      name: "Solo",
      lastName: "Traveler",
      email: "solo@example.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const fakeId = new Types.ObjectId();

    try {
      await acceptTripRequest(user._id.toString(), fakeId.toString());
    } catch (error) {
      expect(error as Error).to.be.instanceOf(NotFoundError);
      expect((error as Error).message).to.equal("trip not found");
    }
  });

  afterEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Trip.deleteMany({}),
      Chat.deleteMany({}),
    ]);
  });

  after(() => {
    return data.disconnect();
  });
});
