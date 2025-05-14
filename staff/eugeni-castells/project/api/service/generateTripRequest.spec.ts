import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User, Van, Trip, Location } from "../data";
import { generateTripRequest } from "./index";
import { RequestTripParams } from "./types";
import { NotFoundError, OverlapError, ValidationError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("generateTripRequest", () => {
  before(() => data.connect(MONGO_URI!, MONGO_DB_TEST!));

  beforeEach(() =>
    Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Trip.deleteMany({}),
      Location.deleteMany({}),
    ])
  );

  it("creates a trip if all conditions are met", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
    });

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: "123",
      location: location._id,
      trips: [],
    });

    const owner = await User.create({
      name: "Owner",
      email: "owner@test.com",
      password: "123",
      location: location._id,
      trips: [],
    });

    const van = await Van.create({
      brand: "VW",
      model: "T5",
      location: location._id,
      owner: owner._id,
      trips: [],
      bedCount: 2,
      doors: 2,
      fuelType: "diesel",
      windows: 3,
    });

    const tripParams: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-03"),
      },
      totalPrice: 300,
    };

    await generateTripRequest(
      user._id.toString(),
      van._id.toString(),
      tripParams
    );

    const trips = await Trip.find();
    expect(trips).to.have.lengthOf(1);
    expect(trips[0].price).to.equal(300);
  });

  it("throws NotFoundError if user does not exist", async () => {
    const van = await Van.create({
      model: "Test",
      brand: "Brand",
      trips: [],
      bedCount: 2,
      doors: 2,
      fuelType: "diesel",
      windows: 3,
    });
    const fakeUserId = new Types.ObjectId();

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-03"),
      },
      totalPrice: 100,
    };

    try {
      await generateTripRequest(
        fakeUserId.toString(),
        van._id.toString(),
        params
      );
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("user not found");
    }
  });

  it("throws NotFoundError if van does not exist", async () => {
    const fakeVanId = new Types.ObjectId();

    const user = await User.create({
      name: "Owner",
      email: "owner@test.com",
      password: "123",
      location: new Types.ObjectId(),
      trips: [],
    });

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-03"),
      },
      totalPrice: 100,
    };

    try {
      await generateTripRequest(
        user._id.toString(),
        fakeVanId.toString(),
        params
      );
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("van not found");
    }
  });

  it("throws OverlapError if user already has a trip in the same dates", async () => {
    const location = await Location.create({ city: "BCN", country: "Spain" });

    const user = await User.create({
      name: "User",
      email: "user@t.com",
      password: "123",
      location: location._id,
    });

    const owner = await User.create({
      name: "Owner",
      email: "owner@t.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
      model: "Van",
      brand: "Brand",
      location: location._id,
      owner: owner._id,
      bedCount: 2,
      doors: 2,
      fuelType: "diesel",
      windows: 3,
    });

    const existingTrip = await Trip.create({
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-03"),
      renter: user._id,
      van: van._id,
    });

    user.trips.push(existingTrip._id);
    await user.save();

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-02"),
        endDate: new Date("2025-06-04"),
      },
      totalPrice: 200,
    };

    try {
      await generateTripRequest(
        user._id.toString(),
        van._id.toString(),
        params
      );
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(OverlapError);
      expect((err as Error).message).to.include("you already have a trip");
    }
  });

  it("throws OverlapError if van already has a trip in the same dates", async () => {
    const location = await Location.create({ city: "BCN", country: "Spain" });

    const user = await User.create({
      name: "User",
      email: "user@t.com",
      password: "123",
      location: location._id,
    });

    const owner = await User.create({
      name: "Owner",
      email: "owner@t.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
      model: "Van",
      brand: "Brand",
      location: location._id,
      owner: owner._id,
      bedCount: 2,
      doors: 2,
      fuelType: "diesel",
      windows: 3,
    });

    const trip = await Trip.create({
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-03"),
      renter: user._id,
      van: van._id,
    });

    van.trips.push(trip._id);
    await van.save();

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-02"),
        endDate: new Date("2025-06-04"),
      },
      totalPrice: 200,
    };

    try {
      await generateTripRequest(
        user._id.toString(),
        van._id.toString(),
        params
      );
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(OverlapError);
      expect((err as Error).message).to.include("van is already booked");
    }
  });

  it("throws SystemError if Trip.create fails", async () => {
    const location = await Location.create({ city: "BCN", country: "Spain" });

    const user = await User.create({
      name: "User",
      email: "user@t.com",
      password: "123",
      location: location._id,
    });

    const owner = await User.create({
      name: "Owner",
      email: "owner@t.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
      model: "Van",
      brand: "Brand",
      location: location._id,
      owner: owner._id,
      bedCount: 2,
      doors: 2,
      fuelType: "diesel",
      windows: 3,
    });

    const original = Trip.create;
    (Trip.create as any) = () => {
      throw new Error("Simulated error");
    };

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-05"),
        endDate: new Date("2025-06-06"),
      },
      totalPrice: 200,
    };

    try {
      await generateTripRequest(
        user._id.toString(),
        van._id.toString(),
        params
      );
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("SystemError");
    } finally {
      Trip.create = original;
    }
  });

  it("throws SystemError if Promise.all fails during final updates", async () => {
    const location = await Location.create({ city: "BCN", country: "Spain" });

    const user = await User.create({
      name: "User",
      email: "user@t.com",
      password: "123",
      location: location._id,
    });

    const owner = await User.create({
      name: "Owner",
      email: "owner@t.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
      model: "Van",
      brand: "Brand",
      location: location._id,
      owner: owner._id,
      bedCount: 2,
      doors: 2,
      fuelType: "diesel",
      windows: 3,
    });

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-10"),
        endDate: new Date("2025-06-12"),
      },
      totalPrice: 200,
    };

    const original = User.updateOne;
    (User.updateOne as any) = () => {
      throw new Error("Simulated update error");
    };

    try {
      await generateTripRequest(
        user._id.toString(),
        van._id.toString(),
        params
      );
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("SystemError");
    } finally {
      User.updateOne = original;
    }
  });

  it("throws ValidationError if userId is invalid", async () => {
    const fakeVanId = new Types.ObjectId().toString();

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-02"),
      },
      totalPrice: 100,
    };

    try {
      await generateTripRequest("invalid-id", fakeVanId, params);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("ValidationError");
      expect(err as Error).to.have.property("name", "ValidationError");
    }
  });

  it("throws ValidationError if vanId is invalid", async () => {
    const user = await User.create({
      name: "John",
      email: "john@test.com",
      password: "123",
      location: new Types.ObjectId(),
    });

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-02"),
      },
      totalPrice: 100,
    };

    try {
      await generateTripRequest(user._id.toString(), "invalid-id", params);
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err as Error).to.be.instanceOf(ValidationError);
      expect(err as Error).to.have.property("name", "ValidationError");
    }
  });

  it("passes van overlap check if dates do not conflict", async () => {
    const location = await Location.create({
      city: "Valencia",
      country: "Spain",
    });

    const user = await User.create({
      name: "Client",
      email: "client@t.com",
      password: "123",
      location: location._id,
    });

    const owner = await User.create({
      name: "Owner",
      email: "owner@t.com",
      password: "123",
      location: location._id,
    });

    const van = await Van.create({
      model: "FreeVan",
      brand: "Renault",
      location: location._id,
      owner: owner._id,
      trips: [],
      bedCount: 2,
      doors: 2,
      fuelType: "diesel",
      windows: 3,
    });

    // Afegim un trip al van, però fora de les dates sol·licitades
    const oldTrip = await Trip.create({
      startDate: new Date("2025-05-01"),
      endDate: new Date("2025-05-05"),
      renter: new Types.ObjectId(),
      van: van._id,
    });

    van.trips.push(oldTrip._id);
    await van.save();

    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date("2025-06-10"),
        endDate: new Date("2025-06-12"),
      },
      totalPrice: 300,
    };

    await generateTripRequest(user._id.toString(), van._id.toString(), params);

    const created = await Trip.find({ renter: user._id });
    expect(created).to.have.lengthOf(1);
    expect(created[0].startDate.toISOString()).to.include("2025-06-10");
    expect(created[0].endDate.toISOString()).to.include("2025-06-12");
  });

  it("throws SystemError if DB fails when fetching user and van", async () => {
    const original = User.findById;
    (User.findById as any) = () => {
      throw new Error("DB crash");
    };

    const fakeId = new Types.ObjectId().toString();
    const params: RequestTripParams = {
      selectedDates: {
        startDate: new Date(),
        endDate: new Date(),
      },
      totalPrice: 100,
    };

    try {
      await generateTripRequest(fakeId, fakeId, params);
      throw new Error("Should have thrown");
    } catch (err) {
      expect((err as Error).name).to.equal("SystemError");
    } finally {
      User.findById = original;
    }
  });

  it("throws ValidationError if selectedDates is missing", async () => {
    const user = await User.create({
      name: "Missing",
      email: "missing@t.com",
      password: "123",
      location: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "Model",
      brand: "Brand",
      location: new Types.ObjectId(),
      owner: user._id,
      bedCount: 2,
      doors: 2,
      fuelType: "diesel",
      windows: 3,
    });

    const badParams = {
      totalPrice: 100,
    } as unknown as RequestTripParams;

    try {
      await generateTripRequest(
        user._id.toString(),
        van._id.toString(),
        badParams
      );
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("selectedDates");
    }
  });

  afterEach(() =>
    Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Trip.deleteMany({}),
      Location.deleteMany({}),
    ])
  );

  after(() => data.disconnect());
});
