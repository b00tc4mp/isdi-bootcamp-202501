"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const data_1 = require("../data");
const index_js_1 = require("./index.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe("authenticateUser", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return data_1.User.deleteMany({});
    });
    it("succeeds on authenticating user with correct credentials", () => {
        const password = "123123123";
        const hashedPassword = bcryptjs_1.default.hashSync(password, 12);
        return data_1.User.create({
            name: "Eugeni",
            username: "euge",
            email: "eu@ge.com",
            address: "Carrer Gran",
            location: "111111111111111c111a1111",
            password: hashedPassword,
        }).then((_user) => {
            return (0, index_js_1.authenticateUser)(_user.email, password).then((authUser) => {
                (0, chai_1.expect)(authUser).to.be.an("object");
                (0, chai_1.expect)(authUser.id).to.equal(_user._id.toString());
                (0, chai_1.expect)(authUser.role).to.equal("regular"); // si aquest és el valor per defecte
            });
        });
    });
    it("fails on wrong email", () => {
        return (0, index_js_1.authenticateUser)("wrong@ge.com", "123123123").catch((error) => {
            (0, chai_1.expect)(error).to.be.instanceOf(Error);
            (0, chai_1.expect)(error.message).to.equal("user not found");
        });
    });
    it("fails on wrong password", () => {
        const password = "123123123";
        const hashedPassword = bcryptjs_1.default.hashSync(password, 12);
        return data_1.User.create({
            name: "Eugeni",
            username: "euge",
            email: "eu@ge.com",
            address: "Carrer Gran",
            location: "111111111111111c111a1111",
            password: hashedPassword,
        }).then((_user) => {
            return (0, index_js_1.authenticateUser)(_user.email, "wrongpassword").catch((error) => {
                (0, chai_1.expect)(error).to.be.instanceOf(Error);
                (0, chai_1.expect)(error.message).to.equal("wrong credentials");
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
