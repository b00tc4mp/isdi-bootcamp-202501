"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Van = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const van = new mongoose_1.Schema({
    model: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    },
    brand: {
        type: String,
        minlength: 3,
        maxLength: 15,
        required: true,
    },
    year: { type: Date, required: true },
    images: [{ type: String, minLength: 10, maxLength: 100 }],
    accessible: { type: Boolean },
    price: { type: Number, min: 0, max: 1000 },
    reviews: [
        {
            type: ObjectId,
            required: true,
            unique: true,
            ref: "Review",
        },
    ],
    location: { type: ObjectId, required: true, ref: "Location" },
    legal: [
        {
            type: ObjectId,
            required: false,
            unique: true,
            ref: "Doc",
        },
    ],
    trips: [
        {
            type: ObjectId,
            required: false,
            unique: true,
            ref: "Trip",
        },
    ],
    windows: { type: Number, min: 1, max: 10, required: true },
    doors: { type: Number, min: 1, max: 10, required: true },
    heating: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    bedCount: { type: Number, min: 1, max: 5, required: true },
    insideKitchen: { type: Boolean, default: false },
    fridge: { type: Boolean, default: false },
    toilet: {
        type: String,
        enum: ["fixed", "portable", "none"],
        default: "none",
    },
    shower: { type: String, enum: ["inside", "outside", "none"], required: true },
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
exports.Van = (0, mongoose_1.model)("Van", van);
