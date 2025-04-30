"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const data_1 = require("../data");
const generateTripRequest_1 = require("./generateTripRequest");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe.only("generateTripRequest", () => {
    debugger;
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([data_1.User.deleteMany({}), data_1.Van.deleteMany({})]);
    });
    it("succeeds on generating trip request", () => {
        debugger;
        let renter;
        let owner;
        let requestedVan;
        let newTripRequestInfo = {
            price: 317.66,
            selectedDates: {
                startDate: new Date(2025, 4, 1),
                endDate: new Date(2025, 4, 7),
            },
            paymentMethod: "currency",
        };
        return Promise.all([
            data_1.User.create({
                name: "Eugeni",
                lastName: "euge",
                email: "eu@ge.com",
                password: "123123123",
                location: "123123123123123123123234",
            }),
            data_1.User.create({
                name: "Aaron",
                lastName: "aaron",
                email: "aa@ron.com",
                password: "123123123",
                location: "123123123123123123123234",
            }),
            data_1.Van.create({
                model: "AB700",
                brand: "Jackson-Warren",
                year: new Date(new Date().getFullYear(), 0, 1),
                images: [
                    "https://www.lorempixel.com/132/843",
                    "https://placekitten.com/27/965",
                ],
                accessible: true,
                price: 317.66,
                reviews: [],
                location: "5f52c9f00f5f4640b1b4dcef",
                legal: [
                    "5f52c9f00f5f4640b1b4dcea",
                    "5f52c9f00f5f4640b1b4dceb",
                    "5f52c9f00f5f4640b1b4dcec",
                ],
                trips: [],
                windows: 9,
                doors: 10,
                heating: false,
                airConditioning: false,
                bedCount: 3,
                insideKitchen: false,
                fridge: true,
                toilet: "fixed",
                shower: "outside",
                fuelType: "petrol",
                storage: 78,
            }),
        ])
            .then(([eugeni, aaron, aaronVan]) => {
            renter = eugeni._id;
            owner = aaron._id;
            aaron.vans.push(aaronVan._id);
            requestedVan = aaronVan;
            aaron.save();
            aaronVan.owner = owner;
            aaronVan.save();
            return;
        })
            .then(() => {
            return (0, generateTripRequest_1.generateTripRequest)(renter.toString(), requestedVan._id.toString(), newTripRequestInfo);
        })
            .then(() => {
            return data_1.Van.find({});
        })
            .then((vans) => {
            (0, chai_1.expect)(vans[0]).to.be.instanceOf(Object);
            (0, chai_1.expect)(vans[0].heating).to.equal(false);
        });
    });
    afterEach(() => {
        return Promise.all([data_1.User.deleteMany({}), data_1.Van.deleteMany({})]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
