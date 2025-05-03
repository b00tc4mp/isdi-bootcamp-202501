"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const chat = new mongoose_1.Schema({
    history: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "ChatComment",
            required: true,
            default: [],
        },
    ],
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    modifiedAt: {
        type: Date,
        default: null,
    },
});
exports.Chat = (0, mongoose_1.model)("Chat", chat);
