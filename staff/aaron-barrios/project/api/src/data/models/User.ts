import { constant } from 'com'
import { model, Schema, Types } from "mongoose"
import { UserDocType } from "../types.js"

const { ObjectId } = Types

const user = new Schema<UserDocType>({
    name: {
        type: String,
        minlength: 1,
        maxlength: 20
    },
    role: {
        type: String,
        enum: ["mod", "regular", "anonym"],
        default: "regular"
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 20
    },
    alias: {
        type: String,
        required: true,
        match: constant.ALIAS_REGEX,
        minlength: 1,
        maxlength: 16,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: constant.EMAIL_REGEX,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 80
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "veteran"],
        default: "beginner"
    },
    interests: {
        type: [String],
        default: []
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

// => middleware to remove default properties if user = mod | anonym
user.pre('validate', function (next) {
    if (this.role !== 'regular') {
        this.level = undefined
        this.interests = undefined
        this.workouts = undefined
        this.routines = undefined
    }

    next()
})

const User = model<UserDocType>("User", user)

export {
    User
}