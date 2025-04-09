import {IRoutineWorkout} from "../models/models.js"
import {ObjectId} from "mongoose"

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