import { Types } from "mongoose"

// --- TYPES DE LOS DATOS TRANSPORTE (DTO) => BASE DE DATOS
export type UserDocType = {
    _id: Types.ObjectId
    role: "mod" | "regular" | "anonym" | "default"
    name?: string
    lastName?: string
    email: string
    alias: string
    password: string
    level?: "beginner" | "intermediate" | "veteran"
    interests?: string[]
    createdAt: Date,
    modifiedAt?: Date | null,
    workouts?: Types.ObjectId[]
    routines?: Types.ObjectId[]
    __v: number
}

export type WorkoutDocType = {
    _id: Types.ObjectId
    author: Types.ObjectId
    name: string
    muscleGroup: "chest" | "legs" | "biceps" | "triceps" | "back" | "shoulders" | "buttocks"
    feedImage: string
    type?: string
    difficulty?: "easy" | "medium" | "hard"
    description: string
    executionImages?: string[]
    likes?: Types.ObjectId[]
    saves?: Types.ObjectId[]
    status: "pending" | "accepted" | "declined" //add revising => if community votes to change smthing or want to remove it
    createdAt: Date
    __v: number
}

export type WorkoutProgressDocType = {
    user: Types.ObjectId
    workout: Types.ObjectId
    weightUsed: number
    date: Date
    __v: number
}

export type RoutineWorkoutDocType = {
    _id: Types.ObjectId
    workout: Types.ObjectId
    order?: number
    sets?: number
    reps?: number
    time?: number
    weight?: number
    restTime?: number
    __v: number
}

export type RoutineDocType = {
    _id: Types.ObjectId
    author: Types.ObjectId
    name: string
    goal: string
    muscleGroup: string
    locationType?: string
    difficulty?: string
    description: string
    feedImage: string
    duration: number
    status: "pending" | "accepted" | "declined" //add revising => if community votes to change smthing or want to remove it
    frequencySuggestion?: string
    likes?: Types.ObjectId[]
    saves?: Types.ObjectId[]
    createdAt: Date
    modifiedAt?: Date | null
    workouts: RoutineWorkoutDocType[]
    __v: number
}

export type UserRole = "anonym" | "regular" | "mod" | "unknown"