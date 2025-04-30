"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatMessagesHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const getChatMessages_1 = require("../service/getChatMessages");
exports.getChatMessagesHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req;
    const { chatId } = req.params;
    return (0, getChatMessages_1.getChatMessages)(userId, chatId).then((chats) => {
        res.status(200).json(chats);
    });
});
