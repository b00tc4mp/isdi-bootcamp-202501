import mongoose from "mongoose";
import { constant } from "com";

const { Schema, model, models } = mongoose;
// User schema definition
const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxLength: 50 },
    email: { type: String, required: true, unique: true, maxLength: 50 },
    password: { type: String, required: true, minlength: 6, maxLength: 100 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
  },
  { versionKey: false }
);

// Property schema definition
const propertySchema = new Schema({
  title: { type: String, required: true, minlength: 3, maxLength: 50 },
  description: { type: String, required: true, minlength: 3, maxLength: 500 },
  price: { type: Number },
  location: { type: String, required: true, minlength: 3, maxLength: 50 },
  images: {
    type: [String], // Permite un array de strings
    required: true, // El array no puede estar vacío
  },
  airbnbUrl: {
    type: String,
    required: true,
    match: constant.URL_REGEX,
  },
  type: {
    type: String,
    required: true,
    enum: ["apartment", "house", "studio"],
  },
  bedrooms: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

const User = models.User || model("User", userSchema);
const Property = models.Property || model("Property", propertySchema);

export { User, Property };
