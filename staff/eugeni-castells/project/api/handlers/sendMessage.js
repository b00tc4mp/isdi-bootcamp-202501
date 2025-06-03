"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const sendMessage_1 = require("../service/sendMessage");
exports.sendMessageHandler = (0, createHandler_1.default)((req, res) => {
    const { chatId } = req.params;
    const { userId } = req;
    const { message } = req.body;
    return (0, sendMessage_1.sendMessage)(userId, chatId, message).then(() => {
        res.status(200).send();
    });
});
