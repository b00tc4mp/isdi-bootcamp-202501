import { model, Schema } from "mongoose"
import { RoutineDocType } from "../types.js"

const routine = new Schema<RoutineDocType>({
    author: {
        type: Schema.Types.ObjectId,
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
    muscleGroup: {
        type: String,
        required: true,
        enum: ["chest", "back", "biceps", "triceps", "shoulders", "legs", "buttocks"],
    },
    feedImage: {
        type: String,
        required: true,
        minlength: 30,
        maxlength: 300
    },
    duration: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    goal: {
        type: String,
        enum: ["strength", "cardio", "mobility", "endurance"]
    },
    locationType: {
        type: String,
        enum: ["gym", "home", "outdoor"]
    },
    difficulty: {
        type: String,
        minlength: 3,
        maxlength: 16
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    saves: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    frequencySuggestion: {
        type: String,
        minlength: 3,
        maxlength: 20
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "declined"]
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
    // workouts: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "RoutineWorkout",
    //     required: true
    // }]
    workouts: [{
        workout: {
            type: Schema.Types.ObjectId,
            ref: "Workout",
            required: true,
            // length: 3
        },
        sets: Number,
        reps: Number,
        weight: Number,
        time: Number,
        restTime: Number,
        order: Number
    }]
})

const Routine = model<RoutineDocType>("Routine", routine)

export {
    Routine
}