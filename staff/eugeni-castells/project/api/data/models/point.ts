import { Schema } from "mongoose";
import { IPoint } from "../interface.js";

export const pointSchema = new Schema<IPoint>({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
