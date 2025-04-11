import { model, Schema, Types } from "mongoose"
import { WorkoutProgressDocType } from "../types.js"

const { ObjectId } = Types

const workoutProgress = new Schema<WorkoutProgressDocType>({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    workout: {
        type: ObjectId,
        ref: 'Workout',
        required: true
    },
    weightUsed: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const WorkoutProgress = model<WorkoutProgressDocType>('WorkoutProgress', workoutProgress)

export {
    WorkoutProgress
}
