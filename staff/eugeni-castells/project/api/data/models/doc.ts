import { Schema, model, Types } from "mongoose";
import { IDoc } from "../interface.js";

const { ObjectId } = Types;

const doc = new Schema<IDoc>({
  content: { type: String, required: true },
  author: { type: ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: null,
  },
  third: {
    type: {
      ObjectId,
    },
    ref: "User",
  },
});

export const Doc = model("Doc", doc);
