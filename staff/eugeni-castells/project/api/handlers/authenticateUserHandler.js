"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const service_1 = require("../service");
exports.authenticateUserHandler = (0, createHandler_1.default)((req, res) => {
    const { email, password } = req.body;
    return (0, service_1.authenticateUser)(email, password).then((userId) => {
        res.json({ userId });
    });
});
