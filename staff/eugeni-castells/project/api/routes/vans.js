"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanRouter = void 0;
const express_1 = require("express");
const authHandler_1 = __importDefault(require("../middlewares/authHandler"));
const getVansHandler_1 = require("../handlers/getVansHandler");
const getVanByIdHandler_1 = require("../handlers/getVanByIdHandler");
const jsonBodyParser_1 = require("../middlewares/jsonBodyParser");
const generateTripRequestHandler_1 = require("../handlers/generateTripRequestHandler");
const getVanReviewsHandler_1 = require("../handlers/getVanReviewsHandler");
exports.vanRouter = (0, express_1.Router)();
exports.vanRouter.get("/", authHandler_1.default, getVansHandler_1.getVansHandler);
exports.vanRouter.get("/:id", authHandler_1.default, getVanByIdHandler_1.getVanByIdHandler);
exports.vanRouter.get("/:id/reviews", authHandler_1.default, getVanReviewsHandler_1.getVanReviewsHandler);
exports.vanRouter.post("/:id/trip-request", jsonBodyParser_1.jsonBodyParser, authHandler_1.default, generateTripRequestHandler_1.generateTripRequestHandler);
