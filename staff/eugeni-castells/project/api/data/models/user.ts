import { constant } from "com";
import { Schema, model, Types } from "mongoose";
import { IUser } from "../interface";

const { ObjectId } = Types;

const user = new Schema<IUser>({
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
      type: ObjectId,
      required: false,
      unique: true,
      ref: "Van",
    },
  ],
  trips: [
    {
      type: ObjectId,
      required: false,
      unique: true,
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
  roadPoints: {
    type: Number,
    match: /^([1-9]?[0-9]{1,4}|100000)$/,
    required: true,
    default: 0,
  },
});

export const User = model<IUser>("User", user);
