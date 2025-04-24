import {
    registerUser,
    getUserRole,
    isUserLoggedIn,
    loginUser,
    logoutUser
} from './user'

import {
    authAnonymUser,
    deleteAnonymUser
} from './user/anonym'

// import {
//
// } from './user/mod'

import {
    getUserAlias,
    getCurrentUser,
    updateUserData

} from './user/regular'

import {
    getAllWorkouts,
    getUserWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkout,
    toggleLikeWorkout,
    toggleSaveWorkout,
    filterWorkouts,
    getModeratorWorkouts,
    reviewWorkout,
    editWorkout,
    defaultWorkoutExecutionImages
} from './workouts'


const services = {
    registerUser,
    getUserRole,
    isUserLoggedIn,
    loginUser,
    logoutUser,

    authAnonymUser,
    deleteAnonymUser,

    getUserAlias,
    getCurrentUser,
    updateUserData,

    getAllWorkouts,
    getUserWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkout,
    toggleLikeWorkout,
    toggleSaveWorkout,
    filterWorkouts,
    getModeratorWorkouts,
    reviewWorkout,
    editWorkout,

    defaultWorkoutExecutionImages
}

export default services