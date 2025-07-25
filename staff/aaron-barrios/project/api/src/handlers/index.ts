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
    getTargetUserDataHandler,

    getMyRoutinesHandler,
    getSavedRoutinesHandler
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
    reviewWorkoutHandler,
    getSuggestedWorkoutsHandler
} from './workouts'

import {
    getAllRoutinesHandler,
    createRoutineHandler,
    filterRoutinesHandler,
    getUserRoutinesHandler,
    getRoutineByIdHandler,
    getModeratorRoutinesHandler,
    deleteRoutineHandler,
    reviewRoutineHandler,
    toggleLikeRoutineHandler,
    toggleSaveRoutineHandler,
    editRoutineHandler,
    saveCustomRoutineHandler,
    getMyCustomRoutinesHandler,
    getCustomRoutineByIdHandler,
    updateCustomRoutineHandler,
    deleteCustomRoutineHandler,
    getRoutineOfTheDayHandler,
    getSuggestedRoutinesHandler
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
    getMyRoutinesHandler,
    getSavedRoutinesHandler,
    getMyCustomRoutinesHandler,
    saveCustomRoutineHandler,

    getAllWorkoutsHandler,
    getWorkoutByIdHandler,
    getModeratorWorkoutsHandler,
    getUserWorkoutsHandler,
    createWorkoutHandler,
    deleteWorkoutHandler,
    filterWorkoutsHandler,
    toggleLikeWorkoutHandler,
    toggleSaveWorkoutHandler,
    getSuggestedWorkoutsHandler,

    getAllRoutinesHandler,
    createRoutineHandler,
    filterRoutinesHandler,
    getUserRoutinesHandler,
    getRoutineByIdHandler,
    getModeratorRoutinesHandler,
    deleteRoutineHandler,
    reviewRoutineHandler,
    toggleLikeRoutineHandler,
    toggleSaveRoutineHandler,
    editRoutineHandler,
    getCustomRoutineByIdHandler,
    updateCustomRoutineHandler,
    deleteCustomRoutineHandler,
    getRoutineOfTheDayHandler,
    getSuggestedRoutinesHandler,
}

export default services