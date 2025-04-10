"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const com_1 = require("com");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_js_1 = require("../../data/models/index.js");
const { SystemError, DuplicityError } = com_1.errors;
const registerUser = (name, lastName, alias, email, password) => {
    com_1.validate.name(name);
    com_1.validate.name(lastName);
    com_1.validate.alias(alias);
    com_1.validate.email(email);
    com_1.validate.password(password);
    return bcryptjs_1.default.hash(password, 10)
        .catch(error => { throw new SystemError(error.message); })
        .then(hash => {
        const newUser = {
            name,
            lastName,
            email,
            alias,
            password: hash
        };
        return index_js_1.User.create(newUser)
            .catch(error => {
            if (error.code === 11000)
                throw new DuplicityError('User already exists!');
            throw new SystemError(error.message);
        });
    })
        .then(() => { });
};
exports.default = registerUser;
