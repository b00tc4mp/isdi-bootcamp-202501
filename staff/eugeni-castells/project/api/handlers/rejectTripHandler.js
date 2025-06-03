"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectTripHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const rejectTripRequest_1 = require("../service/rejectTripRequest");
exports.rejectTripHandler = (0, createHandler_1.default)((req, res) => {
    const { tripId } = req.params;
    const { userId } = req;
    return (0, rejectTripRequest_1.rejectTripRequest)(userId, tripId).then(() => {
        res.status(200).send();
    });
});
