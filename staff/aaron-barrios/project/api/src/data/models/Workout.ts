import { model, Schema } from "mongoose"
import { WorkoutDocType } from "../types.js"


const workout = new Schema<WorkoutDocType>({
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
        minlength: 3,
        maxlength: 20
    },
    feedImage: {
        type: String,
        required: true,
        minlength: 30,
        maxlength: 300
    },
    type: {
        type: String,
        minlength: 3,
        maxlength: 20
    },
    difficulty: {
        type: String,
        minlength: 3,
        maxlength: 16
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    executionImages: [{
        type: String,
        default: []
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    saves: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    status: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "declined"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Workout = model<WorkoutDocType>("Workout", workout)

export {
    Workout
}