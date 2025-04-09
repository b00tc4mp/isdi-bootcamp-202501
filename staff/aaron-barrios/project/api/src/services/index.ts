import {
    reviewWorkout
} from './moderator/index.js'


import {
    registerUser,
    authenticateUser,
    getUserAlias
} from './user/index.js'


const services = {
    reviewWorkout,

    registerUser,
    authenticateUser,
    getUserAlias
}

export default services