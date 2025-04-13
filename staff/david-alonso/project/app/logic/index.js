import { registerUser } from "./registerUser"
import { loginUser } from './loginUser'
import { isUserLoggedIn } from "./isUserLoggedin"
import { logoutUser } from "./logoutUser"
import { registerVehicle } from "./registerVehicle"
logoutUser

export const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    registerVehicle
}

