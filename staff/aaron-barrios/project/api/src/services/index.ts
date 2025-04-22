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
    getModeratorWorkouts
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
    getUserWorkouts
} from './workout'


const services = {
    registerUser,
    authenticateUser,

    generateAnonymUser,
    deleteAnonymUser,

    getModeratorWorkouts,
    removeItem,
    reviewWorkout,

    getCurrentUser,
    getUserAlias,
    updateUserData,

    getUserWorkouts,
    createWorkout,
    createWorkoutProgress,
    deleteWorkout,
    editWorkout,
    getAllWorkouts,
    getWorkoutById
}

export default services