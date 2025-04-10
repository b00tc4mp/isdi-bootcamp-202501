import { Schema, model, Types } from "mongoose";
import { constant } from "com";

//const {ObjectId} = Types

const user = new Schema({
    name: {type: String, required: true, minlength: 3, maxLength: 50},
    email: {type: String, required: true, unique: true, maxLength: 50},
    password: {type: String, required: true, minlength: 6, maxLength: 50},
    createdAt : {type: Date, default: Date.now},
    updatedAt : {type: Date, default: null},
})

const property = new Schema({
    title: {type: String, required: true, minlength: 3, maxLength: 50},
    description: {type: String, required: true, minlength: 3, maxLength: 500},
    price: {type: Number, required: true},
    location: {type: String, required: true, minlength: 3, maxLength: 50},
    images : {type : String, required: true, match: constant.URL_REGEX},
    createdAt : {type: Date, default: Date.now},
    updatedAt : {type: Date, default: null},
})

const User = model("User", user)
const Property = model("Property", property)

export {User, Property}