import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { logoutUser } from './logoutUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { getUserUsername } from './getUserUsername.js'


export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserUsername
}