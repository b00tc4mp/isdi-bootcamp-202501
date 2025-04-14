import "dotenv/config";
import { describe } from "mocha";
import { data, User, Van, Location } from "../data";
import { expect } from "chai";
import { getVans } from "./getVans";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe.only("getVans", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([User.deleteMany({}), Van.deleteMany({})]);
  });

  it("succeeds on retrieving vans", async () => {
    debugger;

    const location = await Location.create({
      city: "Test City",
      country: "Test Country",
      point: { type: "Point", coordinates: [40.7128, -74.006] },
      address: "Test Address",
    });
    let locationId = location._id;

    const location2 = await Location.create({
      city: "Test City",
      country: "Test Country",
      point: { type: "Point", coordinates: [40.7128, -74.006] },
      address: "Test Address",
    });

    let location2Id = location2._id;

    const location3 = await Location.create({
      city: "Test City",
      country: "Test Country",
      point: { type: "Point", coordinates: [40.7128, -74.006] },
      address: "Test Address",
    });
    let location3Id = location3._id;
    const vans = await Van.create([
      {
        brand: "toyota",
        model: "NX500",
        shower: "inside",
        fuelType: "diesel",
        toilet: "fixed",
        windows: 4,
        year: "2022",
        bedCount: 1,
        doors: 2,
        location: locationId,
        reviews: [],
      },
      {
        brand: "toyota",
        model: "NX500",
        shower: "inside",
        fuelType: "diesel",
        toilet: "fixed",
        year: "2022",
        windows: 4,
        bedCount: 1,
        doors: 2,
        location: location2Id,
        reviews: [],
      },
      {
        brand: "toyota",
        model: "NX500",
        shower: "inside",
        fuelType: "diesel",
        toilet: "fixed",
        year: "2022",
        windows: 4,
        bedCount: 1,
        doors: 2,
        location: location3Id,
        reviews: [],
      },
    ]);

    const user = await User.create({
      name: "Test User",
      username: "testuser",
      email: "testuser@example.com",
      password: "hashedpassword",
      location: locationId,
      roadPoints: 0,
    });

    const retrievedVans = await getVans(user._id.toString());
    expect(retrievedVans).to.be.an("array");
    expect(retrievedVans.length).to.be.greaterThan(0);

    vans.forEach((van) => {
      expect(van).to.have.property("location");
      expect(van).to.have.property("model");
      expect(van).to.have.property("brand");
    });
  });

  afterEach(() => {
    return Promise.all([User.deleteMany({}), Van.deleteMany({})]);
  });

  after(() => {
    return data.disconnect();
  });
});
