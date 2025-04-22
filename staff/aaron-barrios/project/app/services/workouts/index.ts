import getAllWorkouts from "@/services/workouts/getAllWorkouts"
import getWorkoutById from "@/services/workouts/getWorkoutById"
import createWorkout from "@/services/workouts/createWorkout"
import deleteWorkout from "@/services/workouts/deleteWorkout"
import toggleLikeWorkout from "@/services/workouts/toggleLikeWorkout"
import toggleSaveWorkout from "@/services/workouts/toggleSaveWorkout"
import filterWorkouts from "@/services/workouts/filterWorkouts"

import defaultWorkoutExecutionImages from "@/services/workouts/defaultWorkoutExecutionImages"

export {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkout,
    toggleLikeWorkout,
    toggleSaveWorkout,
    filterWorkouts,

    defaultWorkoutExecutionImages
}