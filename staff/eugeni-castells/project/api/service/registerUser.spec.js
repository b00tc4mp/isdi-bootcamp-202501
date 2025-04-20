"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const data_1 = require("../data");
const index_js_1 = require("./index.js");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe("registerUser", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return data_1.User.deleteMany({});
    });
    it("succeeds on registering user", () => {
        const newUserInfo = {
            name: "Eugeni",
            lastName: "Castells",
            email: "eu@ge.com",
            password: "123123123",
            address: "gran de sant andreu 368",
            city: "Barcelona",
            country: "Spain",
            coordinates: [2.1734, 41.3851],
        };
        debugger;
        return (0, index_js_1.registerUser)(newUserInfo)
            .then(() => data_1.User.findOne({ name: "Eugeni" }).lean())
            .then((user) => (0, chai_1.expect)(user === null || user === void 0 ? void 0 : user.name).to.equal("Eugeni"));
    });
    afterEach(() => {
        return data_1.User.deleteMany({});
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
