import { model, Schema, Types } from "mongoose"
import { RoutineDocType } from "../types.js"

const { ObjectId } = Types

const routine = new Schema<RoutineDocType>({
    author: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    goal: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    muscleGroup: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    locationType: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    difficulty: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 16
    },
    duration: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    image: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    saves: [{
        type: ObjectId,
        ref: "User"
    }],
    status: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "declined"]
    },
    frequencySuggestion: {
        type: String,
        minlength: 3,
        maxlength: 20
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
        ref: "RoutineWorkout",
        required: true
    }]
})

const Routine = model<RoutineDocType>("Routine", routine)

export {
    Routine
}