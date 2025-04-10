import { Schema, model, Types } from "mongoose";
import { IReview } from "../interface.js";

const { ObjectId } = Types;

const review = new Schema<IReview>({
  author: { type: ObjectId, ref: "User", required: true },
  rating: { type: [Number], min: 0, max: 5 },
  comment: { type: String, minlength: 3, maxLength: 500 },
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

export const Review = model("Review", review);
