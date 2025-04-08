import { constant } from 'com'
import { Schema, model, Types, ObjectId } from 'mongoose'

const { ObjectId } = Types

export interface iUser {
    id: string
    role: string
    name: string
    lastName: string
    email: string
    password: string
    level: string
    interests: string[]
    createdAt: Date,
    modifiedAt: Date,
    workouts: ObjectId[]
    routines: ObjectId[]
}

const user = new Schema<iUser>({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        match: constant.EMAIL_REGEX,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
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
    workouts: [{
        type: ObjectId,
        ref: 'Workout'
    }],
    routines: [{
        type: ObjectId,
        ref: 'Routine'
    }]
})

export interface iWorkout {
    id: string
    author: ObjectId
    name: string
    muscleGroup: string
    type: string
    difficulty: string
    description: string
    images: string[]
    likes: ObjectId[]
    saves: ObjectId[]
    status: string
    createdAt: Date
}

const workout = new Schema<iWorkout>({
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
        ref: 'User' //o iUser
    }],
    saves: [{
        type: ObjectId,
        ref: 'User' //o iUser
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

export interface iWorkoutProgress {
    user: ObjectId
    workout: ObjectId
    weightUsed: number
    date: Date
}

const workoutProgress = new Schema<iWorkoutProgress>({
    user: {
        type: ObjectId,
        ref: 'User', //o iUser
        required: true
    },
    workout: {
        type: ObjectId,
        ref: 'Workout', //o iUser
        required: true
    },
    weightUsed: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        // default: Date.now ???
    }
})

export interface iRoutineWorkout {
    id: string
    workout: ObjectId
    order?: number
    sets?: number
    reps?: number
    time?: number
    weight?: number
    restTime?: number
}

const routineWorkout = new Schema<iRoutineWorkout>({
    workout: {
        type: ObjectId,
        ref: 'Workout', //o iWorkout
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

export interface iRoutine {
    id: string
    author: ObjectId
    name: string
    goal: string
    muscleGroup: string
    locationType: string
    difficulty: string
    description: string
    image: string
    duration: number
    status: string
    frequencySuggestion?: string
    likes: ObjectId[]
    saves: ObjectId[]
    createdAt: Date
    modifiedAt: Date
    workouts: iRoutineWorkout[] //???
}

const routine = new Schema<iRoutine>({
    author: {
        type: ObjectId,
        ref: 'Workout',
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
        ref: 'User' //o iUser
    }],
    saves: [{
        type: ObjectId,
        ref: 'User' //o iUser
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
    workouts: [{
        type: ObjectId,
        ref: 'RoutineWorkout' //o iRoutineWorkout
        //required ??
    }]
})


const User = model('User', user)
const Workout = model('Workout', workout)
const WorkoutProgress = model('WorkoutProgress', workoutProgress)
const RoutineWorkout = model('RoutineWorkout', routineWorkout)
const Routine = model('Routine', routine)

export {
    User,
    Workout,
    WorkoutProgress,
    RoutineWorkout,
    Routine
}