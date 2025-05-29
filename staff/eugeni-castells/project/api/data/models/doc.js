"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doc = void 0;
const mongoose_1 = require("mongoose");
const doc = new mongoose_1.Schema({
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    modifiedAt: {
        type: Date,
        default: null,
    },
    third: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
});
exports.Doc = (0, mongoose_1.model)("Doc", doc);
