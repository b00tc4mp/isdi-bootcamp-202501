import { ObjectId } from "mongoose"

// --- TYPES DE LOS DATOS TRANSPORTE (DTO) => BASE DE DATOS
export type UserDocType = {
    _id: ObjectId
    role: 'moderator' | 'regular' | 'anonym'
    name?: string
    lastName?: string
    email: string
    alias: string
    password: string
    level?: 'beginner' | 'intermediate' | 'veteran'
    interests?: string[]
    createdAt: Date,
    modifiedAt?: Date | null,
    workouts?: ObjectId[]
    routines?: ObjectId[]
    __v: number
}

export type WorkoutDocType = {
    _id: ObjectId
    author: ObjectId
    name: string
    muscleGroup: string
    type?: string
    difficulty?: 'easy' | 'medium' | 'hard'
    description: string
    images?: string[]
    likes?: ObjectId[]
    saves?: ObjectId[]
    status: 'pending' | 'accepted' | 'declined'
    createdAt: Date
    __v: number
}

export type WorkoutProgressDocType = {
    user: ObjectId
    workout: ObjectId
    weightUsed: number
    date: Date
    __v: number
}

export type RoutineWorkoutDocType = {
    _id: ObjectId
    workout: ObjectId
    order?: number
    sets?: number
    reps?: number
    time?: number
    weight?: number
    restTime?: number
    __v: number
}

export type RoutineDocType = {
    _id: ObjectId
    author: ObjectId
    name: string
    goal: string
    muscleGroup: string
    locationType: string
    difficulty: string
    description: string
    image: string
    duration: number
    status: 'pending' | 'accepted' | 'declined'
    frequencySuggestion?: string
    likes: ObjectId[]
    saves: ObjectId[]
    createdAt: Date
    modifiedAt: Date | null
    workouts: RoutineWorkoutDocType[]
    __v: number
}