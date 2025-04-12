"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const data_1 = require("../data");
const registerVan_1 = require("./registerVan");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe.only("registerVan", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([data_1.User.deleteMany({}), data_1.Van.deleteMany({})]);
    });
    it("succeeds on registering van", () => {
        const newVanInfoObject = {
            model: "wrong",
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
        };
        debugger;
        return data_1.User.create({
            name: "Eugeni",
            username: "euge",
            email: "eu@ge.com",
            password: "123123123",
        })
            .then(() => data_1.User.findOne({ name: "Eugeni" }).lean())
            .then((user) => {
            if (user) {
                return (0, registerVan_1.registerVan)(user._id.toString(), newVanInfoObject);
            }
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
