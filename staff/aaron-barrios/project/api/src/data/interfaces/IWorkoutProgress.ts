import {ObjectId} from "mongoose"

export interface IWorkoutProgress {
    user: ObjectId
    workout: ObjectId
    weightUsed: number
    date: Date
}