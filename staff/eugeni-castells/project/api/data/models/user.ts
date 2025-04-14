import { constant } from "com";
import { Schema, model } from "mongoose";
import { UserDocType } from "../types";

const user = new Schema<UserDocType>({
  name: { type: String, required: true, match: constant.NAME_REGEX },
  username: {
    type: String,
    required: true,
    match: constant.USERNAME_REGEX,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: constant.EMAIL_REGEX,
    unique: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["regular", "moderator", "admin"],
    required: true,
    default: "regular",
  },
  vans: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Van",
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
});

export const User = model<UserDocType>("User", user);
