//User
import { authenticateUser } from './user/authenticateUser.js'
import { registerUser } from './user/registerUser.js'

//Vehicle
import { registerVehicle } from './vehicle/registerVehicle.js'
import { getVehicles } from './vehicle/getVehicles.js'
import { updateVehicle } from './vehicle/updateVehicle.js'
import { deleteVehicle } from './vehicle/deleteVehicle.js'

//Maintenance
import { registerManteinance } from './maintenance/registerManteinance.js'
import { getVehicleManteinances } from './maintenance/getVehicleManteinance.js'
import { updateVehicleManteinance } from './maintenance/updateVehicleManteinance.js'
import { deleteVehicleManteinance } from './maintenance/deleteVehicleManteinance.js'

export const logic = {
    //User
    registerUser,
    authenticateUser,
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