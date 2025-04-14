import { Schema, model } from "mongoose";
import { DocDocType } from "../types.js";

const doc = new Schema<DocDocType>({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
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
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Doc = model("Doc", doc);
