"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const com_1 = require("com");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const index_js_1 = require("../../data/index.js");
const getUserAlias_js_1 = __importDefault(require("./getUserAlias.js"));
const { NotFoundError } = com_1.errors;
const { ObjectId } = mongoose_1.Types;
const { MONGO_URI, MONGO_DB_NAME } = process.env;
describe('getUserAlias', () => {
    before(() => index_js_1.data.connect(MONGO_URI, MONGO_DB_NAME));
    beforeEach(() => index_js_1.User.deleteMany({}));
    // --- HAPPY PATH ---   
    it('succeds on obtaining user alias', () => {
        let returnedUserAlias;
        return bcryptjs_1.default.hash('eueueu', 10)
            .then(hashedPassword => index_js_1.User.create({
            name: 'Eu Geni',
            lastName: 'Castells',
            email: 'eu@geni.com',
            alias: 'euge',
            password: hashedPassword
        }))
            .then(user => (0, getUserAlias_js_1.default)(user.id))
            .then(alias => returnedUserAlias = alias)
            .finally(() => (0, chai_1.expect)(returnedUserAlias).to.equal('euge'));
    });
    // --- NOTFOUND ERROR PATH ---   
    it('succeds on not existing user', () => {
        let catchedError;
        return (0, getUserAlias_js_1.default)(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
            (0, chai_1.expect)(catchedError).to.be.instanceOf(NotFoundError);
            (0, chai_1.expect)(catchedError.message).to.equal('User not found!');
        });
    });
    afterEach(() => index_js_1.User.deleteMany({}));
    after(() => index_js_1.data.disconnect());
});
