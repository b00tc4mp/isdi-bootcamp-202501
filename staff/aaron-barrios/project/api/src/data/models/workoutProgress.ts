import {model, Schema, Types} from "mongoose"
import {IWorkoutProgress} from "../interfaces/IWorkoutProgress.js"

const { ObjectId } = Types

const workoutProgress = new Schema<IWorkoutProgress>({
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

const WorkoutProgress = model<IWorkoutProgress>('WorkoutProgress', workoutProgress)

export {
    WorkoutProgress
}
