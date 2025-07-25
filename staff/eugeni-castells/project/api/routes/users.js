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
const getUserNameHandler_1 = require("../handlers/getUserNameHandler");
const authenticateUserHandler_1 = require("../handlers/authenticateUserHandler");
const getUserExchangesHandler_1 = require("../handlers/getUserExchangesHandler");
const getAllUserInfoHandler_1 = require("../handlers/getAllUserInfoHandler");
const multerHandler_1 = require("../middlewares/multerHandler");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/", jsonBodyParser_1.jsonBodyParser, (0, validationHandler_1.validationHandler)(zodSchemas_1.registerUserSchema), registerUserHandler_1.registerUserHandler);
exports.userRouter.post("/van", authHandler_1.default, 
//Multer handler is incompatible with jsonBodyParser handle
// jsonBodyParser,
// validationHandler(registerVanSchema),
multerHandler_1.multerHandler, registerVanHandler_1.registerVanHandler);
exports.userRouter.post("/auth", jsonBodyParser_1.jsonBodyParser, (0, validationHandler_1.validationHandler)(zodSchemas_1.userAuthSchema), authenticateUserHandler_1.authenticateUserHandler);
exports.userRouter.get("/self/username", authHandler_1.default, getUserNameHandler_1.getUserNameHandler);
exports.userRouter.get("/self", authHandler_1.default, getAllUserInfoHandler_1.getAllUserInfoHandler);
exports.userRouter.get("/self/trips", authHandler_1.default, getUserExchangesHandler_1.getUserExchangesHandler);
