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
    updateUserData,
    getSavedWorkouts,
    getMyWorkouts,
    getUserData,
    getTargetUserData,

    getMyRoutines,
    getSavedRoutines

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
    defaultWorkoutExecutionImages,
    getSuggestedWorkouts
} from './workouts'


import {
    getAllRoutines,
    getModeratorRoutines,
    getRoutineById,
    toggleLikeRoutine,
    toggleSaveRoutine,
    reviewRoutine,
    createRoutine,
    filterRoutines,
    editRoutine,
    deleteRoutine,
    getUserRoutines,
    getMyCustomRoutines,
    saveCustomRoutine,
    getCustomRoutineById,
    updateCustomRoutine,
    deleteCustomRoutine,
    getRoutineOfTheDay,
    getSuggestedRoutines
} from './routines'


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
    getSavedWorkouts,
    getMyWorkouts,
    getUserData,
    getTargetUserData,
    getMyRoutines,
    getSavedRoutines,

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
    getSuggestedWorkouts,

    defaultWorkoutExecutionImages,

    getAllRoutines,
    getModeratorRoutines,
    getRoutineById,
    toggleLikeRoutine,
    toggleSaveRoutine,
    reviewRoutine,
    createRoutine,
    filterRoutines,
    editRoutine,
    deleteRoutine,
    getUserRoutines,
    getMyCustomRoutines,
    saveCustomRoutine,
    getCustomRoutineById,
    updateCustomRoutine,
    deleteCustomRoutine,
    getRoutineOfTheDay,
    getSuggestedRoutines,
}

export default services