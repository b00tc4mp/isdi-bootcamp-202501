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
    getAllRoutines
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

    getAllRoutines
}

export default services