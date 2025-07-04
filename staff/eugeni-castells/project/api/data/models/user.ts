import { constant } from "com";
import { Schema, model } from "mongoose";
import { UserDocType } from "../types";

const user = new Schema<UserDocType>({
  name: { type: String, required: true, match: constant.NAME_REGEX },
  lastName: { type: String, match: constant.NAME_REGEX },
  email: {
    type: String,
    required: true,
    match: constant.EMAIL_REGEX,
    unique: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["regular", "anonym", "admin"],
    required: true,
    default: "regular",
  },
  vans: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Van",
      default: [],
    },
  ],
  trips: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Trip",
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
  location: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Location",
  },
  roadPoints: {
    type: Number,
    match: /^([1-9]?[0-9]{1,4}|100000)$/,
    required: true,
    default: 0,
  },
  chats: [
    { type: Schema.Types.ObjectId, required: true, default: [], ref: "Chat" },
  ],
});

export const User = model<UserDocType>("User", user);
