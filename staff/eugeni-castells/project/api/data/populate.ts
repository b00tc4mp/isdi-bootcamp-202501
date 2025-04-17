import "dotenv/config";
import bcrypt from "bcryptjs";
import { data } from ".";
import { User, Van, Trip, Location } from "./models";
import { Types } from "mongoose";
import { UserDocType } from "./index";

const { MONGO_URI, MONGO_DB_APP } = process.env;

data
  .connect(MONGO_URI!, MONGO_DB_APP!)
  .then(() =>
    Promise.all([
      User.deleteMany({}),
      Van.deleteMany({}),
      Trip.deleteMany({}),
      Location.deleteMany({}),
    ])
  )
  .then(() => bcrypt.hash("123123123", 10))
  .then(async (hashedPassword) => {
    const locationId = new Types.ObjectId(); // Assumim una location comuna
    const docId = new Types.ObjectId();

    const [frankieLocation, manuLocation, aaronLocation, luchoLocation] =
      await Location.insertMany([
        {
          address: "carrer joanic",
          city: "barcelona",
          country: "Spain",
          point: { type: "Point", coordinates: [2.1613, 41.4075] },
        },
        {
          address: "carrer del carme",
          city: "barcelona",
          country: "Spain",
          point: { type: "Point", coordinates: [2.1703, 41.3829] },
        },
        {
          address: "carrer major de cornellà",
          city: "cornellà",
          country: "Spain",
          point: { type: "Point", coordinates: [2.0753, 41.3596] },
        },
        {
          address: "plaza cataluña",
          city: "santa fe",
          country: "argentina",
          point: { type: "Point", coordinates: [-60.7096, -31.6361] },
        },
      ]);

    const [frankie, manu, aaron, lucho] = await User.insertMany<
      Partial<UserDocType>
    >([
      {
        name: "Frankie",
        email: "fran@kie.com",
        password: hashedPassword,
        role: "regular",
        createdAt: new Date(),
        location: frankieLocation._id,
        roadPoints: 1500,
        vans: [],
        trips: [],
      },
      {
        name: "Manu",

        email: "ma@nu.com",
        password: hashedPassword,
        role: "regular",
        createdAt: new Date(),
        location: manuLocation._id,
        roadPoints: 800,
        vans: [],
        trips: [],
      },
      {
        name: "Aaron",

        email: "aa@ron.com",
        password: hashedPassword,
        role: "regular",
        createdAt: new Date(),
        modifiedAt: null,
        location: aaronLocation._id,
        roadPoints: 1200,
        vans: [],
        trips: [],
      },
      {
        name: "Luciano",

        email: "lu@cho.com",
        password: hashedPassword,
        role: "moderator",
        createdAt: new Date(2023, 8, 17),
        location: luchoLocation._id,
        roadPoints: 0,
        vans: [],
        trips: [],
      },
    ]);

    const [van1, van2, van3] = await Van.insertMany([
      {
        model: "Sprinter 3000",
        brand: "Mercedes",
        description: "Van ideal per viatges llargs amb aire acondicionat",
        year: new Date(2021, 5),
        images: ["https://img1", "https://img2"],
        accessible: true,
        price: 150,
        reviews: [],
        location: manuLocation._id,
        legal: [docId],
        trips: [],
        windows: 4,
        doors: 3,
        heating: true,
        airConditioning: true,
        bedCount: 2,
        insideKitchen: true,
        fridge: true,
        toilet: "portable",
        shower: "inside",
        fuelType: "diesel",
        storage: 300,
        createdAt: new Date(),
        modifiedAt: null,
      },
      {
        model: "California Camper",
        brand: "Volkswagen",
        description: "Compacta i còmoda",
        year: new Date(2019, 3),
        images: ["https://img3", "https://img4"],
        accessible: false,
        price: 120,
        reviews: [],
        location: frankieLocation._id,
        legal: [],
        trips: [],
        windows: 3,
        doors: 2,
        heating: false,
        airConditioning: true,
        bedCount: 1,
        insideKitchen: true,
        fridge: true,
        toilet: "none",
        shower: "outside",
        fuelType: "petrol",
        storage: 150,
        createdAt: new Date(),
        modifiedAt: null,
      },
      {
        model: "EcoVan X",
        brand: "Renault",
        description: "Ecològica i moderna",
        year: new Date(2022, 0),
        images: ["https://img5", "https://img6"],
        accessible: true,
        price: 180,
        reviews: [],
        location: aaronLocation._id,
        legal: [],
        trips: [],
        windows: 5,
        doors: 4,
        heating: true,
        airConditioning: true,
        bedCount: 3,
        insideKitchen: true,
        fridge: true,
        toilet: "fixed",
        shower: "inside",
        fuelType: "electric",
        storage: 400,
        createdAt: new Date(),
        modifiedAt: null,
      },
    ]);

    manu.vans![0] = van1._id;

    frankie.vans![0] = van2._id;

    aaron.vans![0] = van3._id;

    await Promise.all([manu.save(), frankie.save(), aaron.save()]);

    await Trip.create({
      startDate: new Date(2024, 5, 1),
      endDate: new Date(2024, 5, 15),
      van: van3._id,
      vanOwner: aaron._id,
      renter: manu._id,
      issues: [],
      paymentStatus: "payed",
      paymentMethod: "currency",
      confirmStatus: "accepted",
      price: 300,
      location: [locationId],
      agreements: [docId],
      createdAt: new Date(),
    });
  })
  .finally(() => {
    console.log("✔️  Populate completed!");
    data.disconnect();
  });
