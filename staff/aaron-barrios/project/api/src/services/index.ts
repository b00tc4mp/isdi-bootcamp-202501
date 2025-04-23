import {
    registerUser,
    authenticateUser
} from './session'

import {
    generateAnonymUser,
    deleteAnonymUser
} from './user/anonym'

import {
    changePassword
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
    getModeratorWorkouts,
    reviewWorkout
} from './workout'


const services = {
    registerUser,
    authenticateUser,

    generateAnonymUser,
    deleteAnonymUser,

    changePassword,

    getCurrentUser,
    getUserAlias,
    updateUserData,

    getUserWorkouts,
    getModeratorWorkouts,
    createWorkout,
    createWorkoutProgress,
    deleteWorkout,
    reviewWorkout,
    editWorkout,
    getAllWorkouts,
    getWorkoutById
}

export default services