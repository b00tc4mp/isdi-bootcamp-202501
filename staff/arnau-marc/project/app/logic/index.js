import { getUsername } from "./getUsername.js"
import { loginUser } from "./loginUser.js"
import { logoutUser } from "./logoutUser.js"
import { registerUser } from "./registerUser.js"
import { isUserLoggedIn } from "./isUserLoggedIn.js"

export const logic = {
    loginUser,
    registerUser,
    logoutUser,
    getUsername,
    isUserLoggedIn
}
