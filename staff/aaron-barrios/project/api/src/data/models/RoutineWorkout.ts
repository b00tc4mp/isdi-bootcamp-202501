import { model, Schema } from "mongoose"
import { RoutineWorkoutDocType } from "../types.js"


const routineWorkout = new Schema<RoutineWorkoutDocType>({
    workout: {
        type: Schema.Types.ObjectId,
        ref: "Workout",
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    restTime: {
        type: Number,
        required: true
    }
})

const RoutineWorkout = model<RoutineWorkoutDocType>("RoutineWorkout", routineWorkout)

export {
    RoutineWorkout
}
