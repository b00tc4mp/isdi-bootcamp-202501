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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const data_1 = require("../data");
const index_js_1 = require("./index.js");
const com_1 = require("com");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe("getUserUsername", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return data_1.User.deleteMany({});
    });
    it("succeeds on getting user username", () => {
        return data_1.User.create({
            name: "Eugeni",
            lastName: "Castells",
            email: "eu@ge.com",
            location: "111111111111111111111111",
            password: "$2b$12$XePBJgFgYNcwFk9X2YFJK.MIEE7soiPZznIqeameT9PWuhDG3dHEa",
        }).then((_user) => {
            return (0, index_js_1.getUserName)(_user._id.toString()).then((fullName) => {
                (0, chai_1.expect)(fullName.name).to.equal("Eugeni");
                (0, chai_1.expect)(fullName.lastName).to.equal("Castells");
            });
        });
    });
    it("fails because user doesnt exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeId = new com_1.Types.ObjectId();
        console.log(fakeId);
        try {
            yield (0, index_js_1.getUserName)(fakeId.toString());
        }
        catch (error) {
            (0, chai_1.expect)(error.name).to.equal("NotFoundError");
        }
    }));
    it("fails because invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_js_1.getUserName)("123");
        }
        catch (error) {
            (0, chai_1.expect)(error.name).to.equal("ValidationError");
        }
    }));
    afterEach(() => {
        return data_1.User.deleteMany({});
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
