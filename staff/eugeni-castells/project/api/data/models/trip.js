"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const trip = new mongoose_1.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    van: { type: ObjectId, required: true, ref: "Van" },
    vanOwner: { type: ObjectId, required: true, ref: "User" },
    renter: { type: ObjectId, required: true, ref: "User" },
    issues: [{ type: ObjectId, ref: "Doc" }],
    paymentStatus: { type: String, enum: ["pending", "payed", "rejected"] },
    paymentMethod: { type: String, enum: ["road points", "currency"] },
    confirmStatus: { type: String, enum: ["pending", "payed", "rejected"] },
    price: { type: Number, min: 0, max: 1000 },
    location: [{ type: ObjectId, required: true, ref: "Location" }],
    agreements: [
        {
            type: ObjectId,
            required: false,
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
