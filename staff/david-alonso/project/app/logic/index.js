import { registerUser } from "./registerUser"
import { loginUser } from './loginUser'
import { isUserLoggedIn } from "./isUserLoggedin"
import { logoutUser } from "./logoutUser"
import { registerVehicle } from "./registerVehicle"
import { getVehicles } from "./getVehicles"
import { getUserId } from "./getUserId"
import { updateVehicle } from "./updateVehicle"
import { registerManteinance } from "./registerManteinance"

export const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    registerVehicle,
    getVehicles,
    getUserId,
    updateVehicle,
    registerManteinance
}

