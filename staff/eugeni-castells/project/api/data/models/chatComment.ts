import { Schema, model } from "mongoose";
import { ChatCommentDocType } from "../types.js";

const comment = new Schema<ChatCommentDocType>({
  text: { type: String, minlength: 1, maxlength: 500, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

export const ChatComment = model("ChatComment", comment);
