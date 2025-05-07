//User
import { registerUser } from './user/registerUser'
import { loginUser } from './user/loginUser'
import { isUserLoggedIn } from './user/isUserLoggedIn'
import { logoutUser } from './user/logoutUser'
import { getUserId } from './user/getUserId'

//Vehicle
import { registerVehicle } from './vehicle/registerVehicle'
import { getVehicles } from './vehicle/getVehicles'
import { updateVehicle } from './vehicle/updateVehicle'
import { deleteVehicle } from './vehicle/deleteVehicles'

//Maintenance
import { registerManteinance } from './maintenance/registerManteinance'
import { getVehicleManteinances } from './maintenance/getVehicleManteinances'
import { updateVehicleManteinance } from './maintenance/updateVehicleManteinance'
import { deleteVehicleManteinance } from './maintenance/deleteVehicleManteinance'

export const logic = {
    //User
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    getUserId,
    //Vehicle
    registerVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
    //Maintenance
    registerManteinance,
    getVehicleManteinances,
    updateVehicleManteinance,
    deleteVehicleManteinance
}

