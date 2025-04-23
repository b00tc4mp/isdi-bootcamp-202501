import getAllWorkouts from "@/services/workouts/getAllWorkouts"
import getUserWorkouts from "@/services/workouts/getUserWorkouts"
import getWorkoutById from "@/services/workouts/getWorkoutById"
import createWorkout from "@/services/workouts/createWorkout"
import deleteWorkout from "@/services/workouts/deleteWorkout"
import toggleLikeWorkout from "@/services/workouts/toggleLikeWorkout"
import toggleSaveWorkout from "@/services/workouts/toggleSaveWorkout"
import filterWorkouts from "@/services/workouts/filterWorkouts"
import getModeratorWorkouts from "@/services/workouts/getModeratorWorkouts"

import defaultWorkoutExecutionImages from "@/constants/defaultWorkoutExecutionImages"

export {
    getAllWorkouts,
    getUserWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkout,
    toggleLikeWorkout,
    toggleSaveWorkout,
    filterWorkouts,
    getModeratorWorkouts,

    defaultWorkoutExecutionImages
}