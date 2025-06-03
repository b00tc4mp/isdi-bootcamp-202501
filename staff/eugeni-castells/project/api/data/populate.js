"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const _1 = require(".");
const models_1 = require("./models");
const { MONGO_URI, MONGO_DB_APP } = process.env;
_1.data
    .connect(MONGO_URI, MONGO_DB_APP)
    .then(() => Promise.all([
    models_1.User.deleteMany({}),
    models_1.Van.deleteMany({}),
    models_1.Trip.deleteMany({}),
    models_1.Location.deleteMany({}),
    models_1.Chat.deleteMany({}),
    models_1.ChatComment.deleteMany({}),
]))
    .then(() => bcryptjs_1.default.hash("123123123", 10))
    .then((hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const [loc1, loc2] = yield models_1.Location.insertMany([
        {
            address: "Carrer Gran",
            city: "Barcelona",
            country: "Spain",
            point: { type: "Point", coordinates: [2.17, 41.38] },
        },
        {
            address: "Carrer Major",
            city: "Cornellà",
            country: "Spain",
            point: { type: "Point", coordinates: [2.08, 41.36] },
        },
    ]);
    const [anna, bruno, clara] = yield models_1.User.insertMany([
        {
            name: "Sergi",
            lastName: "Dealer",
            email: "ser@gi.com",
            password: hashedPassword,
            role: "regular",
            location: loc1._id,
            roadPoints: 500,
            vans: [],
            trips: [],
            createdAt: new Date(),
        },
        {
            name: "Masha",
            lastName: "Stepanova",
            email: "ma@sha.com",
            password: hashedPassword,
            role: "regular",
            location: loc2._id,
            roadPoints: 300,
            vans: [],
            trips: [],
            createdAt: new Date(),
        },
        {
            name: "Aaron",
            lastName: "Uwu",
            email: "aa@ron.com",
            password: hashedPassword,
            role: "regular",
            location: loc1._id,
            roadPoints: 200,
            vans: [],
            trips: [],
            createdAt: new Date(),
        },
    ]);
    const vans = yield models_1.Van.insertMany([
        {
            model: "Camper Elite",
            brand: "VW",
            year: new Date(2020, 1),
            location: loc1._id,
            owner: anna._id,
            accessible: true,
            price: 100,
            images: [
                {
                    url: "https://firebasestorage.googleapis.com/v0/b/camperboat-45a0a.firebasestorage.app/o/weinsberg.webp?alt=media&token=adf9c563-81b0-452e-b689-3e5e74e77a61",
                    path: "camper-elite/weinsberg.webp",
                },
            ],
            heating: true,
            airConditioning: true,
            bedCount: 2,
            insideKitchen: true,
            fridge: true,
            toilet: "fixed",
            shower: true,
            fuelType: "diesel",
            storage: 200,
            windows: 3,
            doors: 3,
            createdAt: new Date(),
            reviews: [],
            legal: [],
            trips: [],
        },
        {
            model: "Eco Compact",
            brand: "Fiat",
            year: new Date(2019, 5),
            location: loc2._id,
            owner: bruno._id,
            accessible: false,
            price: 80,
            images: [
                {
                    url: "https://firebasestorage.googleapis.com/v0/b/camperboat-45a0a.firebasestorage.app/o/honda.jpg?alt=media&token=1154d422-30cf-4402-bd18-281b0d2de9fb",
                    path: "eco-compact/honda.jpg",
                },
            ],
            heating: false,
            airConditioning: true,
            bedCount: 1,
            insideKitchen: false,
            fridge: true,
            toilet: "none",
            shower: false,
            fuelType: "petrol",
            storage: 100,
            windows: 2,
            doors: 2,
            createdAt: new Date(),
            reviews: [],
            legal: [],
            trips: [],
        },
        {
            model: "Luxury Travel",
            brand: "Mercedes",
            year: new Date(2022, 0),
            location: loc1._id,
            owner: clara._id,
            accessible: true,
            price: 150,
            images: [
                {
                    url: "https://firebasestorage.googleapis.com/v0/b/camperboat-45a0a.firebasestorage.app/o/kyros.jpg?alt=media&token=047fbc30-c97f-4657-9f3a-a4b401a683cf",
                    path: "luxury-travel/kyros.jpg",
                },
            ],
            heating: true,
            airConditioning: true,
            bedCount: 3,
            insideKitchen: true,
            fridge: true,
            toilet: "portable",
            shower: true,
            fuelType: "diesel",
            storage: 300,
            windows: 4,
            doors: 3,
            createdAt: new Date(),
            reviews: [],
            legal: [],
            trips: [],
        },
    ]);
    // Assignar vans a usuaris
    anna.vans = [vans[0]._id];
    bruno.vans = [vans[1]._id];
    clara.vans = [vans[2]._id];
    yield Promise.all([anna.save(), bruno.save(), clara.save()]);
    // Crear trips
    const trip1 = yield models_1.Trip.create({
        startDate: new Date(2025, 6, 1),
        endDate: new Date(2025, 6, 10),
        van: vans[0]._id,
        renter: bruno._id,
        vanOwner: anna._id,
        confirmStatus: "accepted",
        paymentStatus: "payed",
        paymentMethod: "currency",
        price: 300,
        issues: [],
        agreements: [],
        createdAt: new Date(),
    });
    const trip2 = yield models_1.Trip.create({
        startDate: new Date(2025, 6, 15),
        endDate: new Date(2025, 6, 20),
        van: vans[2]._id,
        renter: anna._id,
        vanOwner: clara._id,
        confirmStatus: "pending",
        paymentStatus: "pending",
        paymentMethod: "currency",
        price: 400,
        issues: [],
        agreements: [],
        createdAt: new Date(),
    });
    anna.trips.push(trip2._id);
    bruno.trips.push(trip1._id);
    clara.trips.push(trip2._id);
    // Crear missatges i xat
    const msg1 = yield models_1.ChatComment.create({
        text: "Hi, can I get your van?",
        author: bruno._id,
    });
    const msg2 = yield models_1.ChatComment.create({
        text: "Sure! When do you need it?",
        author: anna._id,
    });
    const chat = yield models_1.Chat.create({
        participants: [anna._id, bruno._id],
        history: [msg1._id, msg2._id],
        createdAt: new Date(),
    });
    anna.chats.push(chat._id);
    bruno.chats.push(chat._id);
    yield Promise.all([
        anna.save(),
        bruno.save(),
        clara.save(),
        vans[0].save(),
        vans[2].save(),
    ]);
    const [locPatagonia] = yield models_1.Location.insertMany([
        {
            address: "Ushuaia",
            city: "Ushuaia",
            province: "Tierra del Fuego",
            country: "Argentina",
            point: { type: "Point", coordinates: [-68.3, -54.8] },
        },
    ]);
    // Crear usuaris nous
    const [manu, frankie, luciano] = yield models_1.User.insertMany([
        {
            name: "Manu",
            lastName: "Barzi",
            email: "ma@nu.com",
            password: hashedPassword,
            role: "regular",
            location: locPatagonia._id,
            roadPoints: 700,
            vans: [],
            trips: [],
            createdAt: new Date(),
        },
        {
            name: "Frankie",
            lastName: "Guitarras",
            email: "fran@kie.com",
            password: hashedPassword,
            role: "regular",
            location: locPatagonia._id,
            roadPoints: 650,
            vans: [],
            trips: [],
            createdAt: new Date(),
        },
        {
            name: "Luciano",
            lastName: "Pavarotti",
            email: "lu@cho.com",
            password: hashedPassword,
            role: "regular",
            location: locPatagonia._id,
            roadPoints: 800,
            vans: [],
            trips: [],
            createdAt: new Date(),
        },
    ]);
    // Crear vans per cadascun
    const [van4, van5, van6] = yield models_1.Van.insertMany([
        {
            model: "Patagonia Explorer",
            brand: "Ford",
            year: new Date(2021, 3),
            location: locPatagonia._id,
            owner: manu._id,
            accessible: true,
            price: 110,
            images: vans[0].images,
            heating: true,
            airConditioning: true,
            bedCount: 2,
            insideKitchen: true,
            fridge: true,
            toilet: "portable",
            shower: true,
            fuelType: "diesel",
            storage: 180,
            windows: 3,
            doors: 3,
            createdAt: new Date(),
            reviews: [],
            legal: [],
            trips: [],
        },
        {
            model: "Condor Camper",
            brand: "Chevrolet",
            year: new Date(2020, 8),
            location: locPatagonia._id,
            owner: frankie._id,
            accessible: false,
            price: 95,
            images: vans[1].images,
            heating: true,
            airConditioning: true,
            bedCount: 2,
            insideKitchen: false,
            fridge: true,
            toilet: "none",
            shower: false,
            fuelType: "petrol",
            storage: 120,
            windows: 2,
            doors: 2,
            createdAt: new Date(),
            reviews: [],
            legal: [],
            trips: [],
        },
        {
            model: "Southern Luxury",
            brand: "Mercedes",
            year: new Date(2022, 5),
            location: locPatagonia._id,
            owner: luciano._id,
            accessible: true,
            price: 170,
            images: vans[2].images,
            heating: true,
            airConditioning: true,
            bedCount: 4,
            insideKitchen: true,
            fridge: true,
            toilet: "fixed",
            shower: true,
            fuelType: "diesel",
            storage: 350,
            windows: 4,
            doors: 3,
            createdAt: new Date(),
            reviews: [],
            legal: [],
            trips: [],
        },
    ]);
    manu.vans.push(van4._id);
    frankie.vans.push(van5._id);
    luciano.vans.push(van6._id);
    const review1 = yield models_1.Review.create({
        rating: 5,
        comment: "Una furgoneta impecable!",
        author: bruno._id,
        createdAt: new Date(),
    });
    const review2 = yield models_1.Review.create({
        rating: 4,
        comment: "Tot molt correcte, només una mica sorollosa.",
        author: anna._id,
        createdAt: new Date(),
    });
    // Assignar les reviews a les vans correctament
    van4.reviews.push(review1._id, review2._id);
    van5.reviews.push(review1._id);
    van6.reviews.push(review2._id);
    const trip3 = yield models_1.Trip.create({
        startDate: new Date(2025, 7, 1),
        endDate: new Date(2025, 7, 15),
        van: van4._id,
        renter: bruno._id,
        vanOwner: manu._id,
        confirmStatus: "accepted",
        paymentStatus: "payed",
        paymentMethod: "currency",
        price: 220,
        issues: [],
        agreements: [],
        createdAt: new Date(),
    });
    bruno.trips.push(trip3._id);
    manu.trips.push(trip3._id);
    van4.trips.push(trip3._id);
    // Crear comentaris en castellà i un xat entre Manu i Bruno
    const msg3 = yield models_1.ChatComment.create({
        text: "Hola! ¿Está disponible tu van?",
        author: bruno._id,
    });
    const msg4 = yield models_1.ChatComment.create({
        text: "Sí, claro. Te la puedo dejar a partir del lunes!",
        author: manu._id,
    });
    const chat2 = yield models_1.Chat.create({
        participants: [bruno._id, manu._id],
        history: [msg3._id, msg4._id],
        createdAt: new Date(),
    });
    bruno.chats.push(chat2._id);
    manu.chats.push(chat2._id);
    yield Promise.all([
        manu.save(),
        frankie.save(),
        luciano.save(),
        van4.save(),
        van5.save(),
        van6.save(),
        bruno.save(),
    ]);
}))
    .finally(() => {
    console.log("✔️ Populate completat!");
    _1.data.disconnect();
});
