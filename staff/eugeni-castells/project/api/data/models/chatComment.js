"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatComment = void 0;
const mongoose_1 = require("mongoose");
const comment = new mongoose_1.Schema({
    text: { type: String, minlength: 1, maxlength: 500, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
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
exports.ChatComment = (0, mongoose_1.model)("ChatComment", comment);
