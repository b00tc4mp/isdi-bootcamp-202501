"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doc = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const doc = new mongoose_1.Schema({
    content: { type: String, required: true },
    author: { type: ObjectId, ref: "User", required: true },
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
        type: {
            ObjectId,
        },
        ref: "User",
    },
});
exports.Doc = (0, mongoose_1.model)("Doc", doc);
