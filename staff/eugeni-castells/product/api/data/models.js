import { constant } from "com";
import { Schema, Types, model } from "mongoose";

const { ObjectId } = Types;

const user = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 20,
    // match: constant.EMPTY_OR_BLANK_REGEX,
  },
  email: {
    type: String,
    required: true,
    match: constant.EMAIL_REGEX,
    maxLength: 30,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 100,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: null,
  },
});

const post = new Schema({
  image: {
    type: String,
    required: true,
    minLength: 10,
    // maxLength: 60,
    // match: constant.EMPTY_OR_BLANK_REGEX,
  },
  text: {
    type: String,
    required: true,
    // match: constant.EMAIL_REGEX,
    maxLength: 500,
    minLength: 3,
  },
  author: {
    type: ObjectId,
    ref: "User",
  },
  likes: {
    type: [ObjectId],
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modifiedAt: { type: Date, default: null },
});

const User = model("User", user);
const Post = model("Post", post);

export { User, Post };
