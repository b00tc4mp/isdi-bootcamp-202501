import {
    registerUserHandler,
    authenticateUserHandler
} from './session'

import {
    generateAnonymUserHandler,
    deleteAnonymUserHandler
} from './user/anonym'

import {
    reviewWorkoutHandler
} from './user/mod'

import {
    getCurrentUserHandler,
    getUserAliasHandler,
    updateUserDataHandler,
    getMyWorkoutsHandler,
    getSavedWorkoutsHandler,
    getTargetUserDataHandler
} from './user/regular'

import {
    getAllWorkoutsHandler,
    getWorkoutByIdHandler,
    getModeratorWorkoutsHandler,
    getUserWorkoutsHandler,

    createWorkoutHandler,
    deleteWorkoutHandler,

    filterWorkoutsHandler,
    toggleLikeWorkoutHandler,
    toggleSaveWorkoutHandler,
} from './workouts'


const services = {
    registerUserHandler,
    authenticateUserHandler,

    generateAnonymUserHandler,
    deleteAnonymUserHandler,

    reviewWorkoutHandler,

    getCurrentUserHandler,
    getUserAliasHandler,
    updateUserDataHandler,
    getMyWorkoutsHandler,
    getSavedWorkoutsHandler,
    getTargetUserDataHandler,

    getAllWorkoutsHandler,
    getWorkoutByIdHandler,
    getModeratorWorkoutsHandler,
    getUserWorkoutsHandler,
    createWorkoutHandler,
    deleteWorkoutHandler,
    filterWorkoutsHandler,
    toggleLikeWorkoutHandler,
    toggleSaveWorkoutHandler,
}

export default services