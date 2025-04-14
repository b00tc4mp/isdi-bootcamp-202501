"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const jsonBodyParser_1 = require("../middlewares/jsonBodyParser");
const zodSchemas_1 = require("../data/schemas/zodSchemas");
const registerUserHandler_1 = require("../handlers/registerUserHandler");
const validationHandler_1 = require("../middlewares/validationHandler");
const authHandler_1 = __importDefault(require("../middlewares/authHandler"));
const registerVanHandler_1 = require("../handlers/registerVanHandler");
const getUserUsernameHandler_1 = require("../handlers/getUserUsernameHandler");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/", jsonBodyParser_1.jsonBodyParser, (0, validationHandler_1.validationHandler)(zodSchemas_1.registerUserSchema), registerUserHandler_1.registerUserHandler);
exports.userRouter.post("/van", authHandler_1.default, jsonBodyParser_1.jsonBodyParser, (0, validationHandler_1.validationHandler)(zodSchemas_1.registerVanSchema), registerVanHandler_1.registerVanHandler);
exports.userRouter.post("/auth", jsonBodyParser_1.jsonBodyParser, (0, validationHandler_1.validationHandler)(zodSchemas_1.userAuthSchema));
exports.userRouter.get("/self/username", jsonBodyParser_1.jsonBodyParser, 
//authHandler,
getUserUsernameHandler_1.getUserUsernameHandler);
