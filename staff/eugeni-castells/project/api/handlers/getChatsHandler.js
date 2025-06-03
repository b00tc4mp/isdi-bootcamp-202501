"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatsHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const getChats_1 = require("../service/getChats");
exports.getChatsHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req;
    return (0, getChats_1.getChats)(userId).then((chats) => {
        res.status(200).json(chats);
    });
});
