"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const review = new mongoose_1.Schema({
    author: { type: ObjectId, ref: "User", required: true },
    rating: { type: [Number], min: 0, max: 5 },
    comment: { type: String, minlength: 3, maxLength: 500 },
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
exports.Review = (0, mongoose_1.model)("Review", review);
