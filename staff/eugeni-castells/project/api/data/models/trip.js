"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = require("mongoose");
const trip = new mongoose_1.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    van: { type: mongoose_1.Schema.Types.ObjectId, ref: "Van" },
    vanOwner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    renter: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    issues: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Doc" }],
    paymentStatus: { type: String, enum: ["pending", "payed", "rejected"] },
    paymentMethod: { type: String, enum: ["road points", "currency"] },
    confirmStatus: { type: String, enum: ["pending", "accepted", "rejected"] },
    price: { type: Number, min: 0, max: 1000 },
    location: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Location" }],
    agreements: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Doc",
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
