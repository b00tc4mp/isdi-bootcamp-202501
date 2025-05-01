"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRouter = void 0;
const express_1 = require("express");
const authHandler_1 = __importDefault(require("../middlewares/authHandler"));
const acceptTripHandler_1 = require("../handlers/acceptTripHandler");
exports.tripRouter = (0, express_1.Router)();
exports.tripRouter.patch("/:tripId/accept", authHandler_1.default, acceptTripHandler_1.acceptTripHandler);
