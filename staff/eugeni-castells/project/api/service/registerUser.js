"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const com_1 = require("com");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_js_1 = require("../data/index.js");
const errors_1 = require("com/errors");
const registerUser = (name, username, email, password) => {
    com_1.validate.username(username, "username");
    com_1.validate.email(email, "email");
    com_1.validate.password(password, "password");
    com_1.validate.text(name, "name");
    com_1.validate.minLength(name, 3, "name");
    com_1.validate.maxLength(name, 15, "name");
    return index_js_1.User.findOne({ $or: [{ email }, { username }] })
        .lean()
        .catch((error) => {
        throw new errors_1.SystemError(error.message);
    })
        .then((user) => {
        if (user)
            throw new errors_1.DuplicityError("user already exists");
        return bcryptjs_1.default
            .hash(password, 10)
            .catch((error) => {
            throw new errors_1.SystemError(error.message);
        })
            .then((hashedPassword) => {
            const newUser = {
                name,
                username,
                email,
                password: hashedPassword,
            };
            return index_js_1.User.create(newUser).catch((error) => {
                if (error.code === 11000)
                    throw new errors_1.DuplicityError("user already exists");
                throw new errors_1.SystemError(error.message);
            });
        })
            .then(() => { });
    });
};
exports.registerUser = registerUser;
