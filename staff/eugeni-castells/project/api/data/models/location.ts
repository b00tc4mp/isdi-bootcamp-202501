import { Schema, model, Types } from "mongoose";
import { ILocation } from "../interface.js";
import { pointSchema } from "./index.js";

const location = new Schema<ILocation>({
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //     required: true,
  //   },
  //   modifiedAt: {
  //     type: Date,
  //     default: null,
  //   },
  address: { type: String, required: true, minlength: 3, maxLength: 80 },
  city: { type: String, required: true, minlength: 2, maxLength: 40 },
  region: { type: String, required: true, minlength: 2, maxLength: 40 },
  point: {
    type: pointSchema,
    required: true,
  },
});

export const Location = model("Location", location);
