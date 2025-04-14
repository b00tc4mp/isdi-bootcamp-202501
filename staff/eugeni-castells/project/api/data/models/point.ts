import { Schema } from "mongoose";
import { PointDocType } from "../types.js";

export const pointSchema = new Schema<PointDocType>({
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

pointSchema.index({ point: "2dsphere" });
