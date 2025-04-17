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
const registerUser = (newUserInfo) => {
    const { lastName, name, email, password, city, country, address, point } = newUserInfo;
    com_1.validate.username(lastName, "lastName");
    com_1.validate.text(city, "city");
    com_1.validate.minLength(city, 2, "city min length");
    com_1.validate.text(country, "country");
    com_1.validate.maxLength(city, 25, "city max length");
    com_1.validate.minLength(country, 2, "country min length");
    com_1.validate.maxLength(country, 25, "country max length");
    com_1.validate.email(email, "email");
    com_1.validate.password(password, "password");
    com_1.validate.text(name, "name");
    com_1.validate.minLength(name, 3, "name");
    com_1.validate.maxLength(name, 15, "name");
    let locationSend;
    return Promise.all([
        index_js_1.User.findOne({ $or: [{ email }] }).lean(),
        index_js_1.Location.create({ city, country, point: { coordinates: point }, address }),
    ])
        .catch((error) => {
        throw new errors_1.SystemError(error.message);
    })
        .then(([user, _locationSend]) => {
        if (user)
            throw new errors_1.DuplicityError("user already exists");
        locationSend = _locationSend;
        return bcryptjs_1.default
            .hash(password, 10)
            .catch((error) => {
            throw new errors_1.SystemError(error.message);
        })
            .then((hashedPassword) => {
            const newUser = {
                name,
                email,
                password: hashedPassword,
                location: locationSend._id,
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
