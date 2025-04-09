import {ObjectId} from "mongoose"

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