"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const data_1 = require("../data");
const index_js_1 = require("./index.js");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe("authenticateUser", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return data_1.User.deleteMany({});
    });
    it("succeeds on authenticating user", () => {
        return data_1.User.create({
            name: "Eugeni",
            username: "euge",
            email: "eu@ge.com",
            address: "carr gran de sant andreu",
            location: "111111111111111c111a1111",
            password: "$2b$12$XePBJgFgYNcwFk9X2YFJK.MIEE7soiPZznIqeameT9PWuhDG3dHEa",
        }).then((_user) => {
            return (0, index_js_1.authenticateUser)(_user.email, "123123123").then((id) => {
                (0, chai_1.expect)(id).to.equal(_user._id.toString());
            });
        });
    });
    afterEach(() => {
        return data_1.User.deleteMany({});
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
