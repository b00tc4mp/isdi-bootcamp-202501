"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserHandler = void 0;
require("dotenv/config");
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const service_1 = require("../service");
const { JWT_SECRET } = process.env;
exports.authenticateUserHandler = (0, createHandler_1.default)((req, res) => {
    const { email, password } = req.body;
    return (0, service_1.authenticateUser)(email, password).then((user) => {
        const payload = { sub: user.id, role: user.role };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET);
        res.json({ token });
    });
});
