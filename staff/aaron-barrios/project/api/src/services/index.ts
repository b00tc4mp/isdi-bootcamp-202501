import {
    reviewWorkout
} from './user/moderator'


import {
    registerUser,
    authenticateUser,
    getUserData
} from './user/regular'


const services = {
    reviewWorkout,

    registerUser,
    authenticateUser,
    getUserData
}

export default services