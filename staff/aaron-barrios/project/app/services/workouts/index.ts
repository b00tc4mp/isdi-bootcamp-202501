import getAllWorkouts from "@/services/workouts/getAllWorkouts"
import getUserWorkouts from "@/services/workouts/getUserWorkouts"
import getWorkoutById from "@/services/workouts/getWorkoutById"
import getModeratorWorkouts from "@/services/workouts/getModeratorWorkouts"
import getSuggestedWorkouts from "@/services/workouts/getSuggestedWorkouts"

import createWorkout from "@/services/workouts/createWorkout"
import editWorkout from "@/services/workouts/editWorkout"

import deleteWorkout from "@/services/workouts/deleteWorkout"

import toggleLikeWorkout from "@/services/workouts/toggleLikeWorkout"
import toggleSaveWorkout from "@/services/workouts/toggleSaveWorkout"
import filterWorkouts from "@/services/workouts/filterWorkouts"
import reviewWorkout from "@/services/workouts/reviewWorkout"

import defaultWorkoutExecutionImages from "@/constants/defaultWorkoutExecutionImages"

export {
    getAllWorkouts,
    getUserWorkouts,
    getWorkoutById,
    getSuggestedWorkouts,
    getModeratorWorkouts,

    createWorkout,
    editWorkout,

    deleteWorkout,

    toggleLikeWorkout,
    toggleSaveWorkout,
    filterWorkouts,
    reviewWorkout,

    defaultWorkoutExecutionImages
}