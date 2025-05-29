"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const authHandler_1 = __importDefault(require("../middlewares/authHandler"));
const jsonBodyParser_1 = require("../middlewares/jsonBodyParser");
const sendMessageHandler_1 = require("../handlers/sendMessageHandler");
const getChatsHandler_1 = require("../handlers/getChatsHandler");
const getChatMessagesHandler_1 = require("../handlers/getChatMessagesHandler");
exports.chatRouter = (0, express_1.Router)();
exports.chatRouter.post("/:chatId", jsonBodyParser_1.jsonBodyParser, authHandler_1.default, sendMessageHandler_1.sendMessageHandler);
exports.chatRouter.get("/", authHandler_1.default, getChatsHandler_1.getChatsHandler);
exports.chatRouter.get("/:chatId", authHandler_1.default, getChatMessagesHandler_1.getChatMessagesHandler);
