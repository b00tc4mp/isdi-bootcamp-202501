import { model, Schema, Types } from "mongoose"
import { IRoutineWorkout } from "../types.js"

const { ObjectId } = Types


const routineWorkout = new Schema<IRoutineWorkout>({
    workout: {
        type: ObjectId,
        ref: 'Workout',
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

const RoutineWorkout = model<IRoutineWorkout>('RoutineWorkout', routineWorkout)

export {
    RoutineWorkout
}
