import { Schema, model } from "mongoose";
import { LocationDocType } from "../types.js";
import { pointSchema } from "./index.js";

const location = new Schema<LocationDocType>({
  address: { type: String, required: true, minlength: 3, maxLength: 80 },
  city: { type: String, required: true, minlength: 2, maxLength: 40 },
  country: { type: String, required: true, minlength: 2, maxLength: 40 },
  point: {
    type: pointSchema,
    required: false,
  },
});

location.index({ point: "2dsphere" });

export const Location = model("Location", location);
