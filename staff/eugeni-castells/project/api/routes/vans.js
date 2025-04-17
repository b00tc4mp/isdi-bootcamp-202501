"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanRouter = void 0;
const express_1 = require("express");
const authHandler_1 = __importDefault(require("../middlewares/authHandler"));
const getVansHandler_1 = require("../handlers/getVansHandler");
exports.vanRouter = (0, express_1.Router)();
exports.vanRouter.get("/", authHandler_1.default, getVansHandler_1.getVansHandler);
