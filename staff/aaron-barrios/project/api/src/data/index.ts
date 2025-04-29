import mongoose from 'mongoose'
import { errors } from 'com'
import { User, Workout, WorkoutProgress, RoutineWorkout, Routine, CustomRoutine } from './models/index.js'

const { SystemError } = errors

const data = {
    connect(url: string, dbName: string) {
        return mongoose.connect(`${url}/${dbName}`)
            .catch(error => new SystemError(error.message))
    },

    disconnect() {
        return mongoose.disconnect()
    }
}

export {
    data,
    User,
    Workout,
    WorkoutProgress,
    RoutineWorkout,
    Routine,
    CustomRoutine
}