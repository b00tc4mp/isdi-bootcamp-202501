import { loginUser } from './loginUser.js'
import { registerUser } from './registerUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { addClothingItem } from './addClothingItem.js'
import { getUserUsername } from './getUserUsername.js'
import { logoutUser } from './logoutUser.js'

export const logic = {
    loginUser,
    registerUser,
    isUserLoggedIn,
    logoutUser,
    getUserUsername,
    addClothingItem
}