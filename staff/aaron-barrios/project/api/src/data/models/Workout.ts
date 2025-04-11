import { model, Schema, Types } from "mongoose"
import { WorkoutDocType } from "../types.js"

const { ObjectId } = Types

const workout = new Schema<WorkoutDocType>({
    author: {
        type: ObjectId,
        ref: 'User',
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
        minlength: 3,
        maxlength: 20
    },
    type: {
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
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    images: [{
        type: String,
        required: true
    }],
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    saves: [{
        type: ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Workout = model<WorkoutDocType>('Workout', workout)

export {
    Workout
}