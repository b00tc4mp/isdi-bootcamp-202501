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
          "https://weinsberg.com/fileadmin/media/mj2024-2025/camper-van/global/uebersicht/kta-weinsberg-2024-2025-camper-vans-uebersicht-carabus-teaser.jpg",
          "https://m3caravaning.com/wp-content/uploads/2024/11/furgonetas-camper-nuevas.webp",
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
        images: [
          "https://cdn.media.kaavan.es/blobs/vehicles/749b98ed-85b6-48f8-a275-77e879a2f857/medias/3788861.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJ-rYbmBoFPwtTJ3vUEazTnkm9WRN9pHOrw&s",
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
        images: [
          "https://cdn.motor1.com/images/mgl/G3ywZV/s3/honda-n-van-compo.jpg",
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
