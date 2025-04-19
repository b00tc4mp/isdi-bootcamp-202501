import {
    registerUser,
    getUserRole,
    isUserLoggedIn,
    loginUser,
    logoutUser
} from './session'

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
    getUserWorkouts,
    updateUserData

} from './user/regular'

import {
    getAllWorkouts,
    getWorkoutById
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
    getUserWorkouts,
    updateUserData,

    getAllWorkouts,
    getWorkoutById
}

export default services