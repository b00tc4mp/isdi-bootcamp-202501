"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const index_js_1 = require("../../data/index.js");
const registerUser_js_1 = __importDefault(require("./registerUser.js"));
const chai_1 = require("chai");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const com_1 = require("com");
const { DuplicityError } = com_1.errors;
const { MONGO_URI, MONGO_DB_NAME } = process.env;
describe('registerUser', () => {
    before(() => index_js_1.data.connect(MONGO_URI, MONGO_DB_NAME));
    beforeEach(() => index_js_1.User.deleteMany({}));
    //--- HAPPY PATH ---
    it('succeds on new user', () => {
        let result2;
        return (0, registerUser_js_1.default)('Manu', 'Barzi', 'manu@barzi.com', 'manu', 'mamama')
            .then(result => result2 = result)
            .finally(() => (0, chai_1.expect)(result2).to.be.undefined)
            .then(() => index_js_1.User.findOne({ alias: 'manu' }).lean())
            .then(user => {
            (0, chai_1.expect)(user).to.exist;
            (0, chai_1.expect)(user === null || user === void 0 ? void 0 : user.name).to.equal('Manu');
            (0, chai_1.expect)(user === null || user === void 0 ? void 0 : user.lastName).to.equal('Barzi');
            (0, chai_1.expect)(user === null || user === void 0 ? void 0 : user.email).to.equal('manu@barzi.com');
            (0, chai_1.expect)(user === null || user === void 0 ? void 0 : user.alias).to.equal('manu');
            return bcryptjs_1.default.compare('mamama', user.password);
        })
            .then(match => (0, chai_1.expect)(match).to.be.true);
    });
    //--- DUPLICITY ERROR PATH ---
    it('fails on existing user', () => {
        let catchedError;
        return bcryptjs_1.default.hash('mamama', 10)
            .then(hashedPassword => {
            return index_js_1.User.create({
                name: 'Manu',
                lastName: 'Barzi',
                email: 'manu@barzi.com',
                alias: 'manu',
                password: hashedPassword
            });
        })
            .then(() => (0, registerUser_js_1.default)('Manu', 'Barzi', 'manu@barzi.com', 'manu', 'mamama'))
            .catch(error => catchedError = error)
            .finally(() => {
            (0, chai_1.expect)(catchedError).to.be.instanceOf(DuplicityError);
            (0, chai_1.expect)(catchedError.message).to.equal('User already exists!');
        });
    });
    afterEach(() => index_js_1.User.deleteMany({}));
    after(() => index_js_1.data.disconnect());
});
