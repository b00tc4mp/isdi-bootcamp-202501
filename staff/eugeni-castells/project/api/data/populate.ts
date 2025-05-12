import "dotenv/config";
import bcrypt from "bcryptjs";
import { data } from ".";
import { User, Van, Trip, Location, Review } from "./models";
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
        lastName: "friendo",
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
        lastName: "Barzi",
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
        lastName: "Barrios",
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
        lastName: "Paravan",
        email: "lu@cho.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(2023, 8, 17),
        location: luchoLocation._id,
        roadPoints: 0,
        vans: [],
        trips: [],
      },
    ]);

    const reviews = await Review.insertMany([
      {
        author: manu._id,
        rating: 5,
        comment: "An incredible experience! The camper was spotless.",
        createdAt: new Date(),
        modifiedAt: null,
      },
      {
        author: frankie._id,
        rating: 4,
        comment: "Everything was great, but the bed wasn’t very comfortable.",
        createdAt: new Date(),
        modifiedAt: null,
      },
      {
        author: aaron._id,
        rating: 3,
        comment: "Okay for a few days, but it was a bit noisy.",
        createdAt: new Date(),
        modifiedAt: null,
      },
      {
        author: lucho._id,
        rating: 5,
        comment: "Perfect for a road trip. Would definitely do it again!",
        createdAt: new Date(),
        modifiedAt: null,
      },
      {
        author: frankie._id,
        rating: 2,
        comment: "The van wasn’t clean when we arrived.",
        createdAt: new Date(),
        modifiedAt: null,
      },
      {
        author: aaron._id,
        rating: 4,
        comment: "Very practical and well equipped. Ideal for short getaways.",
        createdAt: new Date(),
        modifiedAt: null,
      },
    ]);

    const [van1, van2, van3] = await Van.insertMany([
      {
        model: "Sprinter 3000",
        brand: "Mercedes",
        description: "Van ideal per viatges llargs amb aire acondicionat",
        year: new Date(2021, 5),
        images: [
          {
            url: "https://firebasestorage.googleapis.com/v0/b/camperboat-45a0a.firebasestorage.app/o/weinsberg.webp?alt=media&token=adf9c563-81b0-452e-b689-3e5e74e77a61",
            path: "gs://camperboat-45a0a.firebasestorage.app/weinsberg.webp",
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/camperboat-45a0a.firebasestorage.app/o/weinsberg2.webp?alt=media&token=dd890cd6-3a88-4d93-8aa9-c69e1bb21972",
            path: "gs://camperboat-45a0a.firebasestorage.app/weinsberg2.webp",
          },
        ],
        accessible: true,
        price: 150,
        reviews: [reviews[0]._id, reviews[1]._id],
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
        shower: true,
        fuelType: "diesel",
        storage: 300,
        createdAt: new Date(),
        modifiedAt: null,
        owner: manu._id,
      },
      {
        model: "California Camper",
        brand: "Volkswagen",
        description: "Compacta i còmoda",
        year: new Date(2019, 3),
        images: [
          {
            url: "https://firebasestorage.googleapis.com/v0/b/camperboat-45a0a.firebasestorage.app/o/kyros.jpg?alt=media&token=047fbc30-c97f-4657-9f3a-a4b401a683cf",
            path: "gs://camperboat-45a0a.firebasestorage.app/kyros.jpg",
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/camperboat-45a0a.firebasestorage.app/o/kyros2.jpeg?alt=media&token=f2ed822b-53bd-4530-9093-e5ecc9b22574",
            path: "gs://camperboat-45a0a.firebasestorage.app/kyros2.jpeg",
          },
        ],
        accessible: false,
        price: 120,
        reviews: [reviews[2]._id, reviews[5]._id],
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
        shower: true,
        fuelType: "petrol",
        storage: 150,
        createdAt: new Date(),
        modifiedAt: null,
        owner: frankie._id,
      },
      {
        model: "EcoVan X",
        brand: "Renault",
        description: "Ecològica i moderna",
        year: new Date(2022, 0),
        images: [
          {
            url: "https://firebasestorage.googleapis.com/v0/b/camperboat-45a0a.firebasestorage.app/o/honda.jpg?alt=media&token=1154d422-30cf-4402-bd18-281b0d2de9fb",
            path: "gs://camperboat-45a0a.firebasestorage.app/honda.jpg",
          },
        ],
        accessible: true,
        price: 180,
        reviews: [reviews[3]._id, reviews[4]._id],
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
        shower: false,
        fuelType: "electric",
        storage: 400,
        createdAt: new Date(),
        modifiedAt: null,
        owner: aaron._id,
      },
    ]);

    manu.vans![0] = van1._id;

    frankie.vans![0] = van2._id;

    aaron.vans![0] = van3._id;

    await Promise.all([manu.save(), frankie.save(), aaron.save()]);

    const trip = await Trip.create({
      startDate: new Date(2025, 6, 1),
      endDate: new Date(2025, 6, 15),
      van: van2._id,
      vanOwner: frankie._id,
      renter: manu._id,
      issues: [],
      paymentStatus: "payed",
      paymentMethod: "currency",
      confirmStatus: "pending",
      agreements: [],
      price: 300,
      createdAt: new Date(),
    });

    (van2.trips as Types.ObjectId[])[0] = trip._id;
    (manu.trips as Types.ObjectId[])[0] = trip._id;
    (frankie.trips as Types.ObjectId[])[0] = trip._id;
    await van2.save();
    await manu.save();
    await frankie.save();
  })
  .finally(() => {
    console.log("✔️  Populate completed!");
    data.disconnect();
  });
