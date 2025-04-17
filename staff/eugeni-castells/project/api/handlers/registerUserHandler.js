"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const service_1 = require("../service");
exports.registerUserHandler = (0, createHandler_1.default)((req, res) => {
    const { name, lastName, email, password, city, address, country, point } = req.body;
    return (0, service_1.registerUser)({
        name,
        lastName,
        email,
        password,
        city,
        country,
        point,
        address,
    }).then(() => {
        res.status(201).send();
    });
});
