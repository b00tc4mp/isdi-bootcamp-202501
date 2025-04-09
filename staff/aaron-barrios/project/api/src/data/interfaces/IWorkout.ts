import {ObjectId} from "mongoose"

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