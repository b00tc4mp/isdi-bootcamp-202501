import {
    generateAnonymUserHandler,
    deleteAnonymUserHandler
} from './user/anonym'

import {
    changePasswordHandler
} from './user/mod'

import {
    getUserAliasHandler,
    updateUserDataHandler,
    getMyWorkoutsHandler,
    getSavedWorkoutsHandler,
    getTargetUserDataHandler
} from './user/regular'

import {
    registerUserHandler,
    authenticateUserHandler,
    getCurrentUserHandler,
} from './user'

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
    reviewWorkoutHandler
} from './workouts'

import {
    getAllRoutinesHandler
} from './routines'


const services = {
    registerUserHandler,
    authenticateUserHandler,
    getCurrentUserHandler,

    generateAnonymUserHandler,
    deleteAnonymUserHandler,
    reviewWorkoutHandler,

    changePasswordHandler,

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

    getAllRoutinesHandler,
}

export default services