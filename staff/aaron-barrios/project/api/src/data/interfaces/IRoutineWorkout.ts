import {ObjectId} from "mongoose"

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
