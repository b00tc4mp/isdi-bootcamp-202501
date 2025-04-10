"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const com_1 = require("com");
const index_js_1 = require("../../data/index.js");
const authenticateUser_js_1 = __importDefault(require("./authenticateUser.js"));
const { NotFoundError, CredentialsError } = com_1.errors;
const { MONGO_URI, MONGO_DB_NAME } = process.env;
describe('authenticateUser', () => {
    before(() => index_js_1.data.connect(MONGO_URI, MONGO_DB_NAME));
    beforeEach(() => index_js_1.User.deleteMany({}));
    // --- HAPPY PATH ---
    it('succeds on authentication', () => {
        let returnedUserId;
        return bcryptjs_1.default.hash('eueueu', 10)
            .then(hashedPassword => index_js_1.User.create({
            name: 'Eu Geni',
            lastName: 'Castells',
            email: 'eu@geni.com',
            alias: 'euge',
            password: hashedPassword
        }))
            .then(() => (0, authenticateUser_js_1.default)('euge', 'eueueu'))
            .then(userId => returnedUserId = userId)
            .finally(() => (0, chai_1.expect)(returnedUserId).to.be.a.string)
            .then(() => index_js_1.User.findOne({ alias: 'euge' }).lean())
            .then(user => (0, chai_1.expect)(user === null || user === void 0 ? void 0 : user._id.toString()).to.equal(returnedUserId));
    });
    // --- NOTFOUND ERROR PATH ---
    it('succeds on authentication', () => {
        let catchedError;
        return (0, authenticateUser_js_1.default)('masha', 'mamama')
            .catch(error => catchedError = error)
            .finally(() => {
            (0, chai_1.expect)(catchedError).to.be.instanceOf(NotFoundError);
            (0, chai_1.expect)(catchedError.message).to.equal('User not found!');
        });
    });
    // --- CREDENTIALS ERROR PATH ---
    it('succeds on authentication', () => {
        let catchedError;
        return index_js_1.User.create({
            name: 'Eu Geni',
            lastName: 'Castells',
            email: 'eu@geni.com',
            alias: 'euge',
            password: 'eueueu'
        })
            .then(() => (0, authenticateUser_js_1.default)('eugeni', 'eueueu'))
            .catch(error => catchedError = error)
            .finally(() => {
            (0, chai_1.expect)(catchedError).to.be.instanceOf(CredentialsError);
            (0, chai_1.expect)(catchedError.message).to.equal('Wrong credentials!');
        });
    });
    afterEach(() => index_js_1.User.deleteMany({}));
    after(() => index_js_1.data.disconnect());
});
