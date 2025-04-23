import { Schema, model } from "mongoose";
import { TripDocType } from "../types.js";

const trip = new Schema<TripDocType>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  van: { type: Schema.Types.ObjectId, ref: "Van" },
  vanOwner: { type: Schema.Types.ObjectId, ref: "User" },
  renter: { type: Schema.Types.ObjectId, ref: "User" },
  issues: [{ type: Schema.Types.ObjectId, ref: "Doc" }],
  paymentStatus: { type: String, enum: ["pending", "payed", "rejected"] },
  paymentMethod: { type: String, enum: ["road points", "currency"] },
  confirmStatus: { type: String, enum: ["pending", "accepted", "rejected"] },
  price: { type: Number, min: 0, max: 1000 },
  location: [{ type: Schema.Types.ObjectId, ref: "Location" }],
  agreements: [
    {
      type: Schema.Types.ObjectId,
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

export const Trip = model<TripDocType>("Trip", trip);
