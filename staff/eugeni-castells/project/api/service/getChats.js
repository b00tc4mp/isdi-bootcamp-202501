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
exports.getChats = void 0;
const com_1 = require("com");
const errors_1 = require("com/errors");
const data_1 = require("../data");
const getChats = (userId) => {
    com_1.validate.id(userId, "user id");
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        try {
            user = yield data_1.User.findById(userId)
                .populate({
                path: "chats",
                populate: [
                    {
                        path: "participants createdAt modifiedAt",
                        select: "name lastName",
                    },
                    {
                        path: "history",
                        options: { sort: { createdAt: 1 } },
                        populate: {
                            path: "author",
                            select: "name lastName",
                        },
                    },
                ],
            })
                .lean();
        }
        catch (error) {
            throw new errors_1.SystemError(error.message);
        }
        if (!user) {
            throw new errors_1.NotFoundError("user not found");
        }
        user.chats.forEach((chat) => {
            chat.history.forEach((comment) => {
                comment.own = comment.author._id.toString() === userId;
            });
        });
        const returnedChats = user.chats.map((chat) => ({
            id: chat._id.toString(),
            participants: chat.participants.map((p) => ({
                id: p._id.toString(),
                name: p.name,
                lastName: p.lastName,
            })),
            createdAt: chat.createdAt.toISOString(),
            modifiedAt: chat.modifiedAt === null ? null : chat.modifiedAt.toISOString(),
            history: chat.history.map((comment) => ({
                id: comment._id.toString(),
                text: comment.text,
                createdAt: comment.createdAt.toISOString(),
                author: {
                    id: comment.author._id.toString(),
                    name: comment.author.name,
                    lastName: comment.author.lastName,
                },
                own: comment.author._id.toString() === userId,
            })),
        }));
        return returnedChats;
    }))();
};
exports.getChats = getChats;
