import {
    generateAnonymUser,
    deleteAnonymUser
} from './user/anonym'

import {
    changePassword
} from './user/mod'

import {
    getUserAlias,
    updateUserData,
    getMyWorkouts,
    getSavedWorkouts,
    getTargetUserData,

    getMyRoutines,
    getSavedRoutines
} from './user/regular'

import {
    getCurrentUser,
    authenticateUser,
    registerUser,
} from './user/'

import {
    createWorkout,
    createWorkoutProgress,
    deleteWorkout,
    editWorkout,
    getAllWorkouts,
    getWorkoutById,
    getUserWorkouts,
    getModeratorWorkouts,
    reviewWorkout
} from './workout'

import {
    getAllRoutines,
    createRoutine,
    filterRoutines,
    getUserRoutines,
    getRoutineById,
    getModeratorRoutines,
    deleteRoutine,
    reviewRoutine,
    toggleLikeRoutine,
    toggleSaveRoutine,
    editRoutine
} from './routines'


const services = {
    generateAnonymUser,
    deleteAnonymUser,

    changePassword,

    getUserAlias,
    updateUserData,
    getMyWorkouts,
    getSavedWorkouts,
    getTargetUserData,
    getMyRoutines,
    getSavedRoutines,

    getCurrentUser,
    authenticateUser,
    registerUser,

    getUserWorkouts,
    getModeratorWorkouts,
    createWorkout,
    createWorkoutProgress,
    deleteWorkout,
    reviewWorkout,
    editWorkout,
    getAllWorkouts,
    getWorkoutById,

    getAllRoutines,
    createRoutine,
    filterRoutines,
    getUserRoutines,
    getRoutineById,
    getModeratorRoutines,
    deleteRoutine,
    reviewRoutine,
    toggleLikeRoutine,
    toggleSaveRoutine,
    editRoutine
}

export default services