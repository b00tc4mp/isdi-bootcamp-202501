"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Van = void 0;
const mongoose_1 = require("mongoose");
const van = new mongoose_1.Schema({
    model: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    brand: {
        type: String,
        minlength: 2,
        maxLength: 15,
        required: true,
    },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    description: {
        type: String,
    },
    year: { type: Date },
    images: [
        {
            url: { type: String, required: true },
            path: { type: String, required: true },
        },
    ],
    accessible: { type: Boolean, default: false },
    price: { type: Number, min: 0, max: 1000 },
    reviews: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
        default: [],
    },
    location: { type: mongoose_1.Schema.Types.ObjectId, ref: "Location" },
    legal: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Doc",
        },
    ],
    trips: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Trip",
        },
    ],
    windows: { type: Number, min: 1, max: 10, required: true },
    doors: { type: Number, min: 1, max: 10, required: true },
    heating: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    bedCount: { type: Number, min: 1, max: 5, required: true },
    maxTravellers: { type: Number, min: 1, max: 10, default: 2 },
    insideKitchen: { type: Boolean, default: false },
    fridge: { type: Boolean, default: false },
    toilet: {
        type: String,
        enum: ["fixed", "portable", "none"],
        default: "none",
    },
    shower: { type: Boolean, default: false },
    fuelType: {
        type: String,
        enum: ["petrol", "diesel", "electric", "hybrid"],
        required: true,
    },
    storage: { type: Number, min: 0 },
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
van.index({ point: "2dsphere" });
exports.Van = (0, mongoose_1.model)("Van", van);
