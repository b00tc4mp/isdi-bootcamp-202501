import createWorkoutHandler from "./createWorkoutHandler"
import deleteWorkoutHandler from "./deleteWorkoutHandler"
import reviewWorkoutHandler from "./reviewWorkoutHandler"

import getAllWorkoutsHandler from "./getAllWorkoutsHandler"
import getWorkoutByIdHandler from "./getWorkoutByIdHandler"
import getUserWorkoutsHandler from "./getUserWorkoutsHandler"
import getModeratorWorkoutsHandler from "./getModeratorWorkoutsHandler"
import getSuggestedWorkoutsHandler from "./getSuggestedWorkoutsHandler"

import filterWorkoutsHandler from "./filterWorkoutsHandler"
import toggleLikeWorkoutHandler from "./toggleLikeWorkoutHandler"
import toggleSaveWorkoutHandler from "./toggleSaveWorkoutHandler"

export {
    getAllWorkoutsHandler,
    getUserWorkoutsHandler,
    getWorkoutByIdHandler,
    getModeratorWorkoutsHandler,
    getSuggestedWorkoutsHandler,

    createWorkoutHandler,
    deleteWorkoutHandler,
    filterWorkoutsHandler,
    reviewWorkoutHandler,

    toggleLikeWorkoutHandler,
    toggleSaveWorkoutHandler
}