import { Schema, model } from "mongoose";
import { TripDocType } from "../types.js";

const trip = new Schema<TripDocType>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  van: { type: Schema.Types.ObjectId, ref: "Van", required: true },
  vanOwner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  renter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  issues: [
    { type: Schema.Types.ObjectId, ref: "Doc", required: true, default: [] },
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
      type: Schema.Types.ObjectId,
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

export const Trip = model<TripDocType>("Trip", trip);
