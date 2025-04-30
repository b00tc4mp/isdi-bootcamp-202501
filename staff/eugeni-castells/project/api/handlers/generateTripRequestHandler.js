"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTripRequestHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const service_1 = require("../service");
exports.generateTripRequestHandler = (0, createHandler_1.default)((req, res) => {
    const { id } = req.params;
    const { tripInfo } = req.body;
    const { userId } = req;
    return (0, service_1.generateTripRequest)(userId, id, tripInfo).then(() => {
        res.status(200).send();
    });
});
