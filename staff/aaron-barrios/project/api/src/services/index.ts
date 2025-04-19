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
    getUserWorkouts,
    updateUserData

} from './user/regular'

import {
    createWorkout,
    createWorkoutProgress,
    deleteWorkout,
    editWorkout,
    getAllWorkouts,
    getWorkoutById
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
    getUserWorkouts,
    updateUserData,

    createWorkout,
    createWorkoutProgress,
    deleteWorkout,
    editWorkout,
    getAllWorkouts,
    getWorkoutById
}

export default services