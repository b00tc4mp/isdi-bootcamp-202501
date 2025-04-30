"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = require("mongoose");
const trip = new mongoose_1.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    van: { type: mongoose_1.Schema.Types.ObjectId, ref: "Van", required: true },
    vanOwner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    renter: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    issues: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Doc", required: true, default: [] },
    ],
    paymentStatus: {
        type: String,
        enum: ["pending", "payed", "rejected"],
        required: true,
        default: "pending",
    },
    paymentMethod: {
        type: String,
        enum: ["road points", "currency"],
        required: true,
        default: "currency",
    },
    confirmStatus: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        required: true,
        default: "pending",
    },
    price: { type: Number, min: 0, max: 1000 },
    agreements: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Doc",
            required: true,
            default: [],
        },
    ],
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
exports.Trip = (0, mongoose_1.model)("Trip", trip);
