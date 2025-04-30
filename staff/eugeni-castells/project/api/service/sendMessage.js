"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const chat_1 = require("../data/models/chat");
const chatComment_1 = require("../data/models/chatComment");
const sendMessage = (userId, chatId, message) => {
    com_1.validate.id(userId, "user id");
    com_1.validate.id(chatId, "chat id");
    com_1.validate.string(message, "message");
    com_1.validate.minLength(message, 1, "message min length");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield data_1.User.findById(userId).lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!user) {
            throw new errors_1.NotFoundError("user not found");
        }
        let chat;
        try {
            chat = yield chat_1.Chat.findById(chatId);
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!chat) {
            throw new errors_1.NotFoundError("chat not found");
        }
        const formattedIds = chat.participants.map((participant) => {
            return participant.toString();
        });
        if (!formattedIds.includes(userId)) {
            throw new errors_1.OwnershipError("user is not in this chat");
        }
        let comment;
        try {
            comment = yield chatComment_1.ChatComment.create({
                text: message,
                author: userId,
                createdAt: new Date(Date.now()),
            });
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        try {
            const result = yield chat_1.Chat.updateOne(
            //we make sure the chat with the id has the user as a participant
            { _id: chatId, participants: userId }, {
                $push: { history: comment._id },
                $set: { modifiedAt: new Date() },
            });
            if (result.matchedCount === 0) {
                throw new errors_1.NotFoundError("chat not found");
            }
            if (result.modifiedCount === 0) {
                throw new errors_1.SystemError("chat was not updated");
            }
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
    }))();
};
exports.sendMessage = sendMessage;
