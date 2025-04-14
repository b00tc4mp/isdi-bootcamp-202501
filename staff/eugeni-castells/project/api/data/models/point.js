"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pointSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});
exports.pointSchema.index({ point: "2dsphere" });
