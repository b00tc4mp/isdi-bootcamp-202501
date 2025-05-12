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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const com_1 = require("com");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_js_1 = require("../data/index.js");
const errors_1 = require("com/errors");
const getCityAndCountryFromCoords_js_1 = require("../utils/getCityAndCountryFromCoords.js");
const registerUser = (newUserInfo) => __awaiter(void 0, void 0, void 0, function* () {
    debugger;
    const { lastName, name, email, password, city, country, address, coordinates, } = newUserInfo;
    com_1.validate.username(lastName, "lastName");
    let _city = city;
    let _country = country;
    if (!_city && !_country) {
        try {
            const response = yield (0, getCityAndCountryFromCoords_js_1.getCityCountryFromCoords)(coordinates[0], coordinates[1]);
            _city = response.city;
            _country = response.country;
        }
        catch (error) {
            throw new errors_1.LocationError(error.message);
        }
    }
    if (_city && _country) {
        com_1.validate.text(_city, "city");
        com_1.validate.minLength(_city, 2, "city min length");
        com_1.validate.maxLength(_city, 25, "city max length");
        com_1.validate.text(_country, "country");
        com_1.validate.minLength(_country, 2, "country min length");
        com_1.validate.maxLength(_country, 25, "country max length");
    }
    com_1.validate.email(email, "email");
    com_1.validate.password(password, "password");
    com_1.validate.text(name, "name");
    com_1.validate.minLength(name, 3, "name");
    com_1.validate.maxLength(name, 15, "name");
    let user;
    try {
        user = yield index_js_1.User.findOne({ $or: [{ email }] }).lean();
    }
    catch (error) {
        throw new errors_1.SystemError(error.message);
    }
    if (user) {
        throw new errors_1.DuplicityError("user already exists");
    }
    let locationSend;
    try {
        locationSend = yield index_js_1.Location.create({
            city: _city,
            country: _country,
            point: { type: "Point", coordinates },
            address,
        });
    }
    catch (error) {
        throw new errors_1.SystemError(error.message);
    }
    let hashedPassword;
    try {
        hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    }
    catch (error) {
        throw new errors_1.SystemError(error.message);
    }
    const newUser = {
        name,
        lastName,
        email,
        password: hashedPassword,
        location: locationSend._id,
    };
    try {
        yield index_js_1.User.create(newUser);
    }
    catch (error) {
        if (error.code === 11000) {
            throw new errors_1.DuplicityError("user already exists");
        }
        throw new errors_1.SystemError(error.message);
    }
});
exports.registerUser = registerUser;
