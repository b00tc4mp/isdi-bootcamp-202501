import { ObjectId } from "mongoose"

export interface IUser {
    id: string
    role: 'moderator' | 'regular' | 'anonym',
    name: string
    lastName: string
    email: string
    alias: string
    password: string
    level?: string
    interests?: string[]
    createdAt: Date,
    modifiedAt: Date,
    workouts: ObjectId[]
    routines: ObjectId[]
}

export interface IWorkout {
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

export interface IWorkoutProgress {
    user: ObjectId
    workout: ObjectId
    weightUsed: number
    date: Date
}

export interface IRoutineWorkout {
    id: string
    workout: ObjectId
    order?: number
    sets?: number
    reps?: number
    time?: number
    weight?: number
    restTime?: number
}

export interface IRoutine {
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
    workouts: IRoutineWorkout[]
}