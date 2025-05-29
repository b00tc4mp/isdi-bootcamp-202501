import { model, Schema } from "mongoose"
import { WorkoutProgressDocType } from "../types.js"


const workoutProgress = new Schema<WorkoutProgressDocType>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    workout: {
        type: Schema.Types.ObjectId,
        ref: "Workout",
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

const WorkoutProgress = model<WorkoutProgressDocType>("WorkoutProgress", workoutProgress)

export {
    WorkoutProgress
}
