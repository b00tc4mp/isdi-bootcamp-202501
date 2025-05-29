import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, Van, Trip, User, Location, Review } from "../data";
import { getVanById } from "./index";
import { NotFoundError, SystemError, ValidationError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("getVanById", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([
      Van.deleteMany({}),
      Trip.deleteMany({}),
      User.deleteMany({}),
      Location.deleteMany({}),
      Review.deleteMany({}),
    ]);
  });

  it("returns full van info with features, traits, rating and occupiedDates", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
    });

    const review = await Review.create({
      rating: 4,
      comment: "Molt bé",
      author: user._id,
    });

    const trip = await Trip.create({
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-03"),
      renter: user._id,
      van: new Types.ObjectId(), // actualitzat després
      paymentMethod: "currency",
      confirmStatus: "accepted",
      paymentStatus: "payed",
    });

    const van = await Van.create({
      model: "Transporter",
      brand: "VW",
      location: location._id,
      owner: user._id,
      price: 300,
      accessible: true,
      windows: 3,
      doors: 2,
      bedCount: 2,
      fuelType: "diesel",
      storage: 70,
      heating: true,
      airConditioning: false,
      insideKitchen: true,
      toilet: "fixed",
      shower: true,
      maxTravellers: 4,
      trips: [trip._id],
      reviews: [review._id],
      images: [],
    });

    await Trip.findByIdAndUpdate(trip._id, { van: van._id });

    const result = await getVanById(van._id.toString());

    expect(result).to.have.property("id", van._id.toString());
    expect(result.vehicleTraits).to.deep.equal({
      accessible: true,
      doors: 2,
      bedCount: 2,
      storage: 70,
      fuelType: "diesel",
      windows: 3,
      maxTravellers: 4,
    });

    expect(result.features).to.deep.equal({
      heating: true,
      shower: true,
      airConditioning: false,
      insideKitchen: true,
      toilet: "fixed",
    });

    expect(result.averageRating).to.equal(4);
    expect(result.occupiedDates).to.be.an("array").with.lengthOf(3);
  });

  it("returns van with empty reviews and trips", async () => {
    const user = await User.create({
      name: "Anna",
      lastName: "Puig",
      email: "anna@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const location = await Location.create({
      city: "Girona",
      country: "Spain",
    });

    const van = await Van.create({
      model: "Solo",
      brand: "Ford",
      location: location._id,
      owner: user._id,
      price: 250,
      accessible: false,
      windows: 2,
      doors: 4,
      bedCount: 1,
      fuelType: "petrol",
      storage: 50,
      heating: false,
      airConditioning: true,
      insideKitchen: false,
      toilet: "none",
      shower: false,
      maxTravellers: 2,
      trips: [],
      reviews: [],
      images: [],
    });

    const result = await getVanById(van._id.toString());

    expect(result).to.have.property("averageRating", null);
    expect(result.occupiedDates).to.have.lengthOf(0);
    expect(result.features.toilet).to.equal("none");
  });

  it("throws ValidationError if id is invalid", async () => {
    try {
      await getVanById("invalid-id");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("invalid");
    }
  });

  it("throws SystemError if DB fails during van fetch", async () => {
    const original = Van.findById;

    (Van.findById as any) = () => ({
      populate: () => ({
        select: () => ({
          lean: () => {
            throw new Error("Simulated DB failure");
          },
        }),
      }),
    });

    try {
      await getVanById(new Types.ObjectId().toString());
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.include("Simulated DB failure");
    } finally {
      Van.findById = original;
    }
  });

  it("throws NotFoundError if van is not found", async () => {
    const fakeId = new Types.ObjectId();

    try {
      getVanById(fakeId.toString());
    } catch (error) {
      expect(error).to.be.instanceof(NotFoundError);
      expect((error as Error).message).to.equal("van not found");
    }
  });

  it("throws SystemError if reviews mapping fails", async () => {
    const user = await User.create({
      name: "Test",
      lastName: "Broken",
      email: "fail@test.com",
      password: "123",
      location: new Types.ObjectId(),
    });

    const location = await Location.create({
      city: "Fake",
      country: "Nowhere",
    });

    const review = await Review.create({
      rating: 4,
      comment: "Bad author",
      author: user._id,
    });

    const van = await Van.create({
      model: "BrokenVan",
      brand: "Fail",
      owner: user._id,
      location: location._id,
      price: 100,
      reviews: [review._id],
      trips: [],
      windows: 1,
      doors: 1,
      bedCount: 1,
      fuelType: "diesel",
      storage: 10,
      heating: false,
      airConditioning: false,
      insideKitchen: false,
      toilet: "none",
      shower: false,
      maxTravellers: 2,
    });

    // Sobreescrivim autor malament
    await Review.updateOne({ _id: review._id }, { author: null });

    try {
      await getVanById(van._id.toString());
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(TypeError);
    }
  });

  it("handles trip with invalid date range", async () => {
    const user = await User.create({
      name: "BadTrip",
      email: "bad@trip.com",
      password: "123",
      location: new Types.ObjectId(),
    });
    const location = await Location.create({
      city: "ErrorCity",
      country: "XXXX",
    });

    const trip = await Trip.create({
      startDate: new Date("2025-06-10"),
      endDate: new Date("2025-06-01"), // Dates a l'inrevés
      renter: user._id,
      van: new Types.ObjectId(),
    });

    const van = await Van.create({
      model: "NoDatesVan",
      brand: "ErrorBrand",
      owner: user._id,
      location: location._id,
      price: 100,
      trips: [trip._id],
      reviews: [],
      windows: 1,
      doors: 1,
      bedCount: 1,
      fuelType: "diesel",
      storage: 10,
      heating: false,
      airConditioning: false,
      insideKitchen: false,
      toilet: "none",
      shower: false,
      maxTravellers: 2,
    });

    await Trip.findByIdAndUpdate(trip._id, { van: van._id });

    const result = await getVanById(van._id.toString());
    expect(result.occupiedDates).to.have.lengthOf(0); // no ha d'afegir cap data
  });

  it("sets default comment and rating if missing", async () => {
    const user = await User.create({
      name: "NoComment",
      email: "no@c.com",
      password: "123",
      location: new Types.ObjectId(),
    });
    const location = await Location.create({ city: "XXXX", country: "YYYY" });

    const review = await Review.create({
      author: user._id,
      comment: undefined, // <- força el cas de fallback
    });

    const van = await Van.create({
      model: "TestVan",
      brand: "Test",
      owner: user._id,
      location: location._id,
      price: 123,
      reviews: [review._id],
      trips: [],
      windows: 1,
      doors: 1,
      bedCount: 1,
      fuelType: "diesel",
      storage: 10,
      heating: false,
      airConditioning: false,
      insideKitchen: false,
      toilet: "none",
      shower: false,
      maxTravellers: 1,
    });

    const result = await getVanById(van._id.toString());

    expect(result.averageRating).to.equal(null); // perquè no hi ha rating
    expect(result).to.have.nested.property("features.toilet", "none");
  });

  afterEach(() => {
    return Promise.all([
      Van.deleteMany({}),
      Trip.deleteMany({}),
      User.deleteMany({}),
      Location.deleteMany({}),
      Review.deleteMany({}),
    ]);
  });

  after(() => {
    return data.disconnect();
  });
});
