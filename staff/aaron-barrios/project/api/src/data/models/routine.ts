import {model, Schema, Types} from "mongoose"
import {IRoutine} from "../interfaces/IRoutine.js"
import {IRoutineWorkout} from "../interfaces/IRoutineWorkout.js"

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

const routine = new Schema<IRoutine>({
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
    workouts: {
        type: [routineWorkout],
        required: true
    }
})

const RoutineWorkout = model<IRoutineWorkout>('RoutineWorkout', routineWorkout)
const Routine = model<IRoutine>('Routine', routine)

export {
    RoutineWorkout,
    Routine
}