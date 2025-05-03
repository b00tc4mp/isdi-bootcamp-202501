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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatMessages = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const chat_1 = require("../data/models/chat");
const getChatMessages = (userId, chatId) => {
    com_1.validate.id(userId, "user id");
    com_1.validate.id(chatId, "chat id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
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
            chat = yield chat_1.Chat.findById(chatId)
                .populate({
                path: "history",
                select: "text author createdAt",
                //Here we make the sort in the populate because we want to sort the history inside each chat, no the chats
                options: { sort: { createdAt: 1 } },
                populate: {
                    path: "author",
                    select: "name lastName",
                },
            })
                .sort()
                .lean();
            const populatedChatHistoryWithOwn = (_a = chat === null || chat === void 0 ? void 0 : chat.history.map((comment) => {
                //First we remove the _id of the item
                const { _id, author } = comment, rest = __rest(comment, ["_id", "author"]);
                //Secondly, we remove the _id of the author. We use an alias to differentiate it from the previous _id
                const { _id: authorId } = author, sanitizedAuthor = __rest(author, ["_id"]);
                //We use the sanitized author to set the returnedAuthor
                const sanitizedComment = Object.assign(Object.assign({}, rest), { author: sanitizedAuthor });
                return Object.assign(Object.assign({}, sanitizedComment), { own: userId === comment.author._id.toString(), createdAt: comment.createdAt.toISOString() });
            })) !== null && _a !== void 0 ? _a : [];
            return populatedChatHistoryWithOwn;
        }
        catch (error) {
            throw new errors_1.NotFoundError("chat not found");
        }
    }))();
};
exports.getChatMessages = getChatMessages;
