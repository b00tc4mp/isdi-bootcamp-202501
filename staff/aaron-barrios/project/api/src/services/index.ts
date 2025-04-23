import {
    registerUser,
    authenticateUser
} from './session'

import {
    generateAnonymUser,
    deleteAnonymUser
} from './user/anonym'

import {
    reviewWorkout,
    removeItem,
} from './user/mod'

import {
    getUserAlias,
    getCurrentUser,
    updateUserData

} from './user/regular'

import {
    createWorkout,
    createWorkoutProgress,
    deleteWorkout,
    editWorkout,
    getAllWorkouts,
    getWorkoutById,
    getUserWorkouts,
    getModeratorWorkouts
} from './workout'


const services = {
    registerUser,
    authenticateUser,

    generateAnonymUser,
    deleteAnonymUser,

    removeItem,
    reviewWorkout,

    getCurrentUser,
    getUserAlias,
    updateUserData,

    getUserWorkouts,
    getModeratorWorkouts,
    createWorkout,
    createWorkoutProgress,
    deleteWorkout,
    editWorkout,
    getAllWorkouts,
    getWorkoutById
}

export default services