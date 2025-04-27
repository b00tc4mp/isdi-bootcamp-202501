import "dotenv/config";
import { describe } from "mocha";
import { data, User, Van, Location, Trip } from "../data";
import { expect } from "chai";
import { getVans } from "./getVans";

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
    ]);
  });

  it("succeeds on retrieving vans with no filter", async () => {
    const location = await Location.create({
      city: "Test City",
      country: "Test Country",
      point: { type: "Point", coordinates: [40.7128, -74.006] },
      address: "Test Address",
    });
    let locationId = location._id;

    const londres = await Location.create({
      city: "Test City",
      country: "Test Country",
      point: { type: "Point", coordinates: [40.7128, -74.006] },
      address: "Test Address",
    });

    let location2Id = londres._id;

    const bali = await Location.create({
      city: "bali",
      country: "Indonesia",
      point: { type: "Point", coordinates: [115.1889, -8.4095] },
      address: "Test Address",
    });
    let location3Id = bali._id;

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

    const retrievedVans = await getVans(user._id.toString(), [null, null]);
    expect(retrievedVans).to.be.an("array");
    expect(retrievedVans.length).to.be.greaterThan(0);

    vans.forEach((van) => {
      expect(van).to.have.property("location");
      expect(van).to.have.property("model");
      expect(van).to.have.property("brand");
    });

    expect(vans[0].model).to.equal("NX500");
  });

  it("succeeds on retrieving vans with location filter", async () => {
    const londres = await Location.create({
      city: "Londres",
      country: "UK",
      point: { type: "Point", coordinates: [-0.1276, 51.5072] },
      address: "Test Address",
    });
    let locationId = londres._id;

    const berlin = await Location.create({
      city: "Berlin",
      country: "Germany",
      point: { type: "Point", coordinates: [13.405, 52.52] },
      address: "Test Address",
    });

    let location2Id = berlin._id;

    const bali = await Location.create({
      city: "Bali",
      country: "Indonesia",
      point: { type: "Point", coordinates: [115.1889, -8.4095] },
      address: "Test Address",
    });
    let location3Id = bali._id;

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
        model: "VM500",
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

    const searchLocation = await Location.create({
      city: "Prenzlauer",
      country: "Germany",
      point: {
        type: "Point",
        coordinates: [13.42443, 52.53878],
      },
    });
    const retrievedVans = await getVans(user._id.toString(), [
      searchLocation.point.coordinates[0],
      searchLocation.point.coordinates[1],
    ]);

    expect(retrievedVans).to.be.an("array");
    expect(retrievedVans.length).to.equal(1);

    expect(retrievedVans[0].model).to.equal("VM500");

    retrievedVans.forEach((van) => {
      expect(van).to.have.property("location");
      expect(van).to.have.property("model");
      expect(van).to.have.property("brand");
    });
  });

  it("succeeds on retrieving vans with dates filter", async () => {
    debugger;

    const plaçaCatalunya = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.1701, 41.387] }, // Plaça Catalunya
      address: "Plaça de Catalunya",
    });
    let plaçaCatalunyaId = plaçaCatalunya._id;

    const sagradaFamilia = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.1744, 41.4036] }, // Sagrada Família
      address: "Carrer de Mallorca, 401",
    });
    let sagradaFamiliaId = sagradaFamilia._id;

    const pobleSec = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.1639, 41.3722] }, // Poble-sec
      address: "Carrer de Blai",
    });
    let pobleSecId = pobleSec._id;

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
        location: plaçaCatalunyaId,
        reviews: [],
      },
      {
        brand: "toyota",
        model: "VM500",
        shower: "inside",
        fuelType: "diesel",
        toilet: "fixed",
        year: "2022",
        windows: 4,
        bedCount: 1,
        doors: 2,
        location: sagradaFamiliaId,
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
        location: pobleSecId,
        reviews: [],
      },
    ]);

    const user = await User.create({
      name: "Test User",
      lastName: "testuser",
      email: "testuser@example.com",
      password: "hashedpassword",
      location: pobleSecId,
      roadPoints: 0,
    });

    const renter = await User.create({
      name: "Test renter",
      lastName: "testuser",
      email: "testRenter@example.com",
      password: "hashedpassword",
      location: pobleSecId,
      roadPoints: 0,
    });

    const trip = await Trip.create({
      price: 344,
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 3),
      renter: renter,
      owner: user._id,
      van: vans[0]._id,
    });

    vans[0].trips.push(trip._id);

    await vans[0].save();

    const retrievedVans = await getVans(user._id.toString(), [null, null], {
      start: trip.startDate,
      end: trip.endDate,
    });

    expect(retrievedVans).to.be.an("array");
    expect(retrievedVans.length).to.equal(2);

    expect(retrievedVans[0].model).to.equal("VM500");

    retrievedVans.forEach((van) => {
      expect(van).to.have.property("location");
      expect(van).to.have.property("model");
      expect(van).to.have.property("brand");
    });
  });
  it("succeeds on retrieving vans with location and dates filter", async () => {
    debugger;

    const plaçaCatalunya = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.1701, 41.387] }, // Plaça Catalunya
      address: "Plaça de Catalunya",
    });
    let plaçaCatalunyaId = plaçaCatalunya._id;

    const sagradaFamilia = await Location.create({
      city: "Barcelona",
      country: "Spain",
      point: { type: "Point", coordinates: [2.1744, 41.4036] }, // Sagrada Família
      address: "Carrer de Mallorca, 401",
    });
    let sagradaFamiliaId = sagradaFamilia._id;

    const paris = await Location.create({
      city: "Paris",
      country: "France",
      point: { type: "Point", coordinates: [2.3522, 48.8566] }, // Poble-sec
      address: "Carrer de Blai",
    });
    let parisId = paris._id;

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
        location: plaçaCatalunyaId,
        reviews: [],
      },
      {
        brand: "toyota",
        model: "VM500",
        shower: "inside",
        fuelType: "diesel",
        toilet: "fixed",
        year: "2022",
        windows: 4,
        bedCount: 1,
        doors: 2,
        location: sagradaFamiliaId,
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
        location: parisId,
        reviews: [],
      },
    ]);

    const user = await User.create({
      name: "Test User",
      lastName: "testuser",
      email: "testuser@example.com",
      password: "hashedpassword",
      location: parisId,
      roadPoints: 0,
    });

    const renter = await User.create({
      name: "Test renter",
      lastName: "testuser",
      email: "testRenter@example.com",
      password: "hashedpassword",
      location: sagradaFamiliaId,
      roadPoints: 0,
    });

    const trip = await Trip.create({
      price: 344,
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 3),
      renter: renter,
      owner: user._id,
      van: vans[0]._id,
    });

    vans[0].trips.push(trip._id);

    await vans[0].save();

    const retrievedVans = await getVans(
      user._id.toString(),
      [
        plaçaCatalunya.point.coordinates[0],
        plaçaCatalunya.point.coordinates[1],
      ],
      {
        start: trip.startDate,
        end: trip.endDate,
      }
    );

    expect(retrievedVans).to.be.an("array");
    expect(retrievedVans.length).to.equal(1);

    expect(retrievedVans[0].model).to.equal("VM500");

    retrievedVans.forEach((van) => {
      expect(van).to.have.property("location");
      expect(van).to.have.property("model");
      expect(van).to.have.property("brand");
    });
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
