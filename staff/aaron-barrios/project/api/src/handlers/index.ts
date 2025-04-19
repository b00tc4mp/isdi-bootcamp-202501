import {
    registerUserHandler,
    authenticateUserHandler
} from './session'

import {
    generateAnonymUserHandler,
    deleteAnonymUserHandler
} from './user/anonym'

import {

} from './user/mod'

import {
    getCurrentUserHandler,
    getUserAliasHandler,
    updateUserDataHandler
} from './user/regular'

import {
    getAllWorkoutsHandler,
    getWorkoutByIdHandler,
    createWorkoutHandler,
    deleteWorkoutHandler
} from './workouts'


const services = {
    registerUserHandler,
    authenticateUserHandler,

    generateAnonymUserHandler,
    deleteAnonymUserHandler,

    getCurrentUserHandler,
    getUserAliasHandler,
    updateUserDataHandler,

    getAllWorkoutsHandler,
    getWorkoutByIdHandler,
    createWorkoutHandler,
    deleteWorkoutHandler
}

export default services