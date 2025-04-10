import {
    reviewWorkout
} from './user/moderator'


import {
    registerUser,
    authenticateUser,
    getUserAlias
} from './user/regular'


const services = {
    reviewWorkout,

    registerUser,
    authenticateUser,
    getUserAlias
}

export default services