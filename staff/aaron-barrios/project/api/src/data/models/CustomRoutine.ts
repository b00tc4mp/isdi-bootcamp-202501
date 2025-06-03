import { model, Schema } from "mongoose"
import { CustomRoutineType } from "../types"

const customRoutineSchema = new Schema<CustomRoutineType>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    originalRoutineId: {
        type: Schema.Types.ObjectId,
        ref: "Routine",
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
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
        maxlength: 300,
    },
    duration: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: null,
    },
    workouts: [{
        workoutId: {
            type: Schema.Types.ObjectId,
            ref: "Workout",
            required: true,
        },
        order: {
            type: Number,
            required: true,
            min: 0
        },
        sets: {
            type: Number,
            required: true,
            min: 1
        },
        reps: {
            type: Number,
            required: true,
            min: 1
        },
        weight: {
            type: Number,
            default: 0
        },
        restTime: {
            type: Number,
            required: true,
            min: 0
        },
        time: Number,
    }],
})

const CustomRoutine = model<CustomRoutineType>("CustomRoutine", customRoutineSchema)

export { CustomRoutine }
