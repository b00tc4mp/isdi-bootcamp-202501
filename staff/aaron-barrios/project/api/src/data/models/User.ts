import { constant } from 'com'
import { model, Schema, Types } from "mongoose"
import { UserDocType } from "../types.js"

const { ObjectId } = Types

const user = new Schema<UserDocType>({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        match: constant.EMAIL_REGEX,
        maxlength: 30,
        unique: true
    },
    alias: {
        type: String,
        required: true,
        match: constant.NAME_REGEX,
        minlength: 1,
        maxlength: 16,
        unique: true
    },
    level: {
        type: String,
        required: true,
        enum: ["beginner", "intermediate", "veteran"]
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 80
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    },
    workouts: [{
        type: ObjectId,
        ref: "Workout"
    }],
    routines: [{
        type: ObjectId,
        ref: "Routine"
    }]
})

const User = model<UserDocType>("User", user)

export {
    User
}