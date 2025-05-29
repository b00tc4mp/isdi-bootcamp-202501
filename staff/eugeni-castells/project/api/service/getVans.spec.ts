import "dotenv/config";
import { describe } from "mocha";
import { data, User, Van, Location, Trip, Review } from "../data";
import { expect } from "chai";
import { getVans } from "./index";
import { Types } from "com";
import { NotFoundError, SystemError, ValidationError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("getVans", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
      Trip.deleteMany({}),
    ]);
  });

  it("succeeds on retrieving vans with no filter", async () => {
    const location = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.17, 41.38] },
      address: "Centre",
    });

    const vans = await Van.create([
      {
        brand: "Toyota",
        model: "NX500",
        fuelType: "diesel",
        toilet: "fixed",
        windows: 3,
        year: "2023",
        bedCount: 2,
        doors: 2,
        location: location._id,
        reviews: [],
        trips: [],
        maxTravellers: 4,
      },
    ]);

    const user = await User.create({
      name: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "123123",
      location: location._id,
    });

    const result = await getVans(user._id.toString(), [null, null]);

    expect(result).to.be.an("array").with.lengthOf(1);
    expect(result[0]).to.have.property("model", "NX500");
    expect(result[0]).to.have.property("averageRating", null);
  });

  it("succeeds on retrieving vans filtered by location", async () => {
    const near = await Location.create({
      city: "Girona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.82, 41.98] },
      address: "Centre",
    });

    const far = await Location.create({
      city: "Madrid",
      country: "Spain",
      point: { type: "Point", coordinates: [-3.7038, 40.4168] },
      address: "Gran Via",
    });

    await Van.create([
      {
        brand: "Toyota",
        model: "VM100",
        fuelType: "diesel",
        toilet: "fixed",
        windows: 3,
        year: "2023",
        bedCount: 2,
        doors: 2,
        location: near._id,
        reviews: [],
        trips: [],
        maxTravellers: 3,
      },
      {
        brand: "Renault",
        model: "XP300",
        fuelType: "petrol",
        toilet: "fixed",
        windows: 3,
        year: "2022",
        bedCount: 2,
        doors: 2,
        location: far._id,
        reviews: [],
        trips: [],
        maxTravellers: 3,
      },
    ]);

    const user = await User.create({
      name: "Tester",
      lastName: "Map",
      email: "test@map.com",
      password: "123123",
      location: near._id,
    });

    const result = await getVans(user._id.toString(), [2.82, 41.98]);

    expect(result).to.be.an("array").with.lengthOf(1);
    expect(result[0]).to.have.property("model", "VM100");
    expect(result[0]).to.have.property("averageRating", null);
  });

  it("succeeds on retrieving vans filtered by date", async () => {
    const loc = await Location.create({
      city: "Sitges",
      country: "Spain",
      point: { type: "Point", coordinates: [1.8, 41.23] },
      address: "Beach",
    });

    const vanWithTrip = await Van.create({
      brand: "Citroën",
      model: "Berlingo",
      fuelType: "diesel",
      toilet: "fixed",
      windows: 3,
      year: "2023",
      bedCount: 2,
      doors: 2,
      location: loc._id,
      reviews: [],
      trips: [],
      maxTravellers: 3,
    });

    const freeVan = await Van.create({
      brand: "Opel",
      model: "Zafira",
      fuelType: "diesel",
      toilet: "fixed",
      windows: 3,
      year: "2023",
      bedCount: 2,
      doors: 2,
      location: loc._id,
      reviews: [],
      trips: [],
      maxTravellers: 3,
    });

    const user = await User.create({
      name: "Booking",
      lastName: "Guy",
      email: "booking@guy.com",
      password: "123123",
      location: loc._id,
    });

    const renter = await User.create({
      name: "Renter",
      lastName: "Person",
      email: "renter@person.com",
      password: "123123",
      location: loc._id,
    });

    const trip = await Trip.create({
      price: 100,
      startDate: new Date(2025, 6, 1),
      endDate: new Date(2025, 6, 5),
      renter: renter._id,
      van: vanWithTrip._id,
    });

    vanWithTrip.trips.push(trip._id);
    await vanWithTrip.save();

    const result = await getVans(user._id.toString(), [null, null], {
      start: new Date(2025, 6, 2),
      end: new Date(2025, 6, 4),
    });

    expect(result).to.be.an("array").with.lengthOf(1);
    expect(result[0].model).to.equal("Zafira");
  });

  it("succeeds on retrieving vans filtered by location AND date", async () => {
    const loc = await Location.create({
      city: "Tarragona",
      country: "Spain",
      point: { type: "Point", coordinates: [1.25, 41.11] },
      address: "Port",
    });

    const overlappingVan = await Van.create({
      brand: "Fiat",
      model: "Overlapping",
      fuelType: "diesel",
      toilet: "fixed",
      windows: 3,
      year: "2023",
      bedCount: 2,
      doors: 2,
      location: loc._id,
      reviews: [],
      trips: [],
      maxTravellers: 3,
    });

    const freeVan = await Van.create({
      brand: "Seat",
      model: "FreeTime",
      fuelType: "diesel",
      toilet: "fixed",
      windows: 3,
      year: "2023",
      bedCount: 2,
      doors: 2,
      location: loc._id,
      reviews: [],
      trips: [],
      maxTravellers: 3,
    });

    const user = await User.create({
      name: "MultiFilter",
      lastName: "User",
      email: "filter@combo.com",
      password: "123123",
      location: loc._id,
    });

    const renter = await User.create({
      name: "Renter",
      email: "rent@van.com",
      password: "123123",
      location: loc._id,
    });

    const trip = await Trip.create({
      startDate: new Date(2025, 7, 1), // agost
      endDate: new Date(2025, 7, 5),
      renter: renter._id,
      van: overlappingVan._id,
    });

    overlappingVan.trips.push(trip._id);
    await overlappingVan.save();

    const result = await getVans(user._id.toString(), [1.25, 41.11], {
      start: new Date(2025, 7, 2),
      end: new Date(2025, 7, 4),
    });

    expect(result).to.be.an("array").with.lengthOf(1);
    expect(result[0].model).to.equal("FreeTime");
  });

  it("throws ValidationError if userId is not a valid ObjectId", async () => {
    try {
      await getVans("not-a-valid-id", [null, null]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("ValidationError");
      expect(err as Error).to.be.instanceof(ValidationError);
      expect((err as Error).message).to.include("invalid");
    }
  });

  it("throws NotFoundError if user does not exist", async () => {
    const fakeId = new Types.ObjectId().toString();

    try {
      await getVans(fakeId, [null, null]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("NotFoundError");
      expect(err as Error).to.be.instanceof(NotFoundError);
      expect((err as Error).message).to.equal("user not found");
    }
  });

  it("throws NotFoundError if user's location has no coordinates", async () => {
    const brokenLocation = await Location.create({
      city: "NoCoords",
      country: "Spain",
      address: "Somewhere",
      point: undefined, // <- sense coordinates
    });

    const user = await User.create({
      name: "Coordless",
      lastName: "User",
      email: "no@coords.com",
      password: "123123",
      location: brokenLocation._id,
    });

    try {
      await getVans(user._id.toString(), [null, null]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("NotFoundError");
      expect(err as Error).to.be.instanceof(NotFoundError);
      expect((err as Error).message).to.include(
        "user location coordinates missing"
      );
    }
  });

  it("throws SystemError if DB fails while fetching location", async () => {
    const original = Location.findById;
    (Location.findById as any) = () => ({
      lean: () => {
        throw new SystemError("Simulated DB error while fetching location");
      },
    });

    const location = await Location.create({
      city: "Any",
      country: "Spain",
      point: { type: "Point", coordinates: [2.1, 41.3] },
      address: "Somewhere",
    });

    const user = await User.create({
      name: "FailLocation",
      email: "fail@loc.com",
      password: "123",
      location: location._id,
    });

    try {
      await getVans(user._id.toString(), [null, null]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("SystemError");
      expect(err as Error).to.be.instanceof(SystemError);
      expect((err as Error).message).to.include("Simulated DB error");
    } finally {
      Location.findById = original;
    }
  });

  it("throws SystemError if DB fails while fetching nearby locations", async () => {
    const original = Location.find;
    (Location.find as any) = () => ({
      select: () => {
        throw new SystemError("Simulated location query fail");
      },
    });

    const location = await Location.create({
      city: "ErrorLand",
      country: "Nowhere",
      point: { type: "Point", coordinates: [2.1, 41.3] },
      address: "Edge",
    });

    const user = await User.create({
      name: "Error",
      email: "error@loc.com",
      password: "123",
      location: location._id,
    });

    try {
      await getVans(user._id.toString(), [null, null]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("SystemError");
      expect(err as Error).to.be.instanceof(SystemError);
      expect((err as Error).message).to.include(
        "Simulated location query fail"
      );
    } finally {
      Location.find = original;
    }
  });

  it("throws SystemError if DB fails during van fetch", async () => {
    const original = Van.find;
    (Van.find as any) = () => ({
      populate: () => ({
        select: () => ({
          sort: () => ({
            lean: () => {
              throw new SystemError("Simulated van fetch fail");
            },
          }),
        }),
      }),
    });

    const loc = await Location.create({
      city: "ErrorCity",
      country: "ErrorCountry",
      point: { type: "Point", coordinates: [2, 41] },
      address: "Fail",
    });

    const user = await User.create({
      name: "Crash",
      email: "crash@fail.com",
      password: "123",
      location: loc._id,
    });

    try {
      await getVans(user._id.toString(), [null, null]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("SystemError");
      expect(err as Error).to.be.instanceof(SystemError);
      expect((err as Error).message).to.include("Simulated van fetch fail");
    } finally {
      Van.find = original;
    }
  });

  it("sets modifiedAt as null when not present", async () => {
    const location = await Location.create({
      city: "NullModCity",
      country: "NullModCountry",
      point: { type: "Point", coordinates: [1, 41] },
      address: "Null Mod",
    });

    const van = await Van.create({
      model: "NoMod",
      brand: "NoModBrand",
      location: location._id,
      trips: [],
      reviews: [],
      windows: 2,
      doors: 2,
      bedCount: 2,
      fuelType: "diesel",
      maxTravellers: 4,
    });

    const user = await User.create({
      name: "Modless",
      email: "mod@less.com",
      password: "123",
      location: location._id,
    });

    const result = await getVans(user._id.toString(), [null, null]);
    expect(result[0]).to.have.property("modifiedAt", null);
  });

  it("sets modifiedAt properly when present and when absent", async () => {
    const location = await Location.create({
      city: "ModCity",
      country: "Spain",
      point: { type: "Point", coordinates: [2.12, 41.4] },
      address: "DateTest",
    });

    const now = new Date();

    // Van amb modifiedAt
    const modifiedVan = await Van.create({
      model: "Modified",
      brand: "TestBrand",
      location: location._id,
      trips: [],
      reviews: [],
      windows: 2,
      doors: 2,
      bedCount: 2,
      fuelType: "diesel",
      maxTravellers: 4,
      modifiedAt: now,
    });

    // Van sense modifiedAt (undefined)
    const unmodifiedVan = await Van.create({
      model: "Unmodified",
      brand: "OtherBrand",
      location: location._id,
      trips: [],
      reviews: [],
      windows: 2,
      doors: 2,
      bedCount: 2,
      fuelType: "diesel",
      maxTravellers: 4,
    });

    const user = await User.create({
      name: "WithModDate",
      email: "mod@yes.com",
      password: "123123",
      location: location._id,
    });

    const result = await getVans(user._id.toString(), [null, null]);

    const modified = result.find((van) => van.model === "Modified");
    const unmodified = result.find((van) => van.model === "Unmodified");

    expect(modified?.modifiedAt).to.be.an.instanceOf(Date);
    expect(modified?.modifiedAt?.toISOString()).to.equal(now.toISOString());

    expect(unmodified?.modifiedAt).to.equal(null);
  });

  it("throws ValidationError when validate.id fails", () => {
    expect(() => getVans("", [null, null])).to.throw("invalid"); // assumeix que `validate.id` peta amb string buit
  });

  it("throws NotFoundError when user's location is not found", async () => {
    const fakeLocationId = new Types.ObjectId();
    const user = await User.create({
      name: "Ghost",
      email: "ghost@test.com",
      password: "123",
      location: fakeLocationId,
    });

    try {
      await getVans(user._id.toString(), [null, null]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("NotFoundError");
      expect(err as Error).to.be.instanceof(NotFoundError);
      expect((err as Error).message).to.include("user location not found");
    }
  });

  it("throws SystemError if DB fails while fetching user", async () => {
    const original = User.findById;
    (User.findById as any) = () => ({
      lean: () => {
        throw new Error("Simulated DB user fetch fail");
      },
    });

    try {
      await getVans(new Types.ObjectId().toString(), [null, null]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect((err as Error).name).to.equal("SystemError");
      expect((err as Error).message).to.include("Simulated DB user fetch fail");
    } finally {
      User.findById = original; // restableix el mètode original
    }
  });

  it("throws SystemError if DB fails during van fetch", async () => {
    const originalVanFind = Van.find;

    (Van.find as any) = () => ({
      populate: () => ({
        select: () => ({
          sort: () => ({
            lean: () => {
              throw new SystemError("Simulated van fetch fail");
            },
          }),
        }),
      }),
    });

    const location = await Location.create({
      city: "FailCity",
      country: "Nowhere",
      point: { type: "Point", coordinates: [2.0, 41.0] },
      address: "Nowhere Street",
    });

    const user = await User.create({
      name: "FailureUser",
      email: "fail@fetch.com",
      password: "123456",
      location: location._id,
    });

    try {
      await getVans(user._id.toString(), [2.0, 41.0]);
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).name).to.equal("SystemError");
      expect((err as Error).message).to.include("Simulated van fetch fail");
    } finally {
      Van.find = originalVanFind;
    }
  });

  it("sets modifiedAt as null when it's explicitly null", async () => {
    const location = await Location.create({
      city: "NullCity",
      country: "Spain",
      point: { type: "Point", coordinates: [1, 41] },
      address: "Null Street",
    });

    await Van.create({
      model: "NullModel",
      brand: "NullBrand",
      location: location._id,
      trips: [],
      reviews: [],
      windows: 2,
      doors: 2,
      bedCount: 2,
      fuelType: "diesel",
      maxTravellers: 4,
      modifiedAt: null, // <- això activa el ternari
    });

    const user = await User.create({
      name: "NullModUser",
      email: "null@mod.com",
      password: "123",
      location: location._id,
    });

    const result = await getVans(user._id.toString(), [null, null]);
    expect(result[0].modifiedAt).to.equal(null);
  });

  it("retrieves van with review populated with author name", async () => {
    const location = await Location.create({
      city: "ReviewTown",
      country: "Spain",
      point: { type: "Point", coordinates: [2.0, 41.0] },
      address: "Review St",
    });

    const author = await User.create({
      name: "Reviewer",
      lastName: "Reviewer",
      email: "review@user.com",
      password: "123",
      location: location._id,
    });

    const review = await Review.create({
      comment: "Great van!",
      author: author._id,
      rating: 5,
    });

    const van = await Van.create({
      model: "ReviewModel",
      brand: "VanBrand",
      location: location._id,
      trips: [],
      reviews: [review._id],
      windows: 2,
      doors: 2,
      bedCount: 2,
      fuelType: "diesel",
      maxTravellers: 4,
    });

    const user = await User.create({
      name: "Searcher",
      email: "search@user.com",
      password: "123",
      location: location._id,
    });

    const result = await getVans(user._id.toString(), [null, null]);
    expect(result[0].reviews).to.have.lengthOf(1);
    expect(result[0].reviews[0].comment).to.equal("Great van!");
    expect(result[0].reviews[0].author.name).to.equal("Reviewer");
    expect(result[0].reviews[0].author.lastName).to.equal("Reviewer");
  });

  afterEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Location.deleteMany({}),
      Trip.deleteMany({}),
    ]);
  });

  after(() => {
    return data.disconnect();
  });
});
