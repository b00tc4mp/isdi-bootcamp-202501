import { Schema, model } from "mongoose";
import { ChatDocType } from "../types.js";

const chat = new Schema<ChatDocType>({
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "ChatComment",
      required: true,
      default: [],
    },
  ],
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
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

export const Chat = model("Chat", chat);
