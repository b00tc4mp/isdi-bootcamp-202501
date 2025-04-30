import { authenticateUser } from './authenticateUser.js'
import { registerUser } from './registerUser.js'
import { registerVehicle } from './registerVehicle.js'
import { getVehicles } from './getVehicles.js'
import { updateVehicle } from './updateVehicle.js'
import { registerManteinance } from './registerManteinance.js'
import { getVehicleManteinances } from './getVehicleManteinance.js'
import { deleteVehicle } from './deleteVehicle.js'
import { updateVehicleManteinance } from './updateVehicleManteinance.js'
import { deleteVehicleManteinance } from './deleteVehicleManteinance.js'

export const logic = {
    registerUser,
    authenticateUser,
    registerVehicle,
    getVehicles,
    updateVehicle,
    registerManteinance,
    getVehicleManteinances,
    deleteVehicle,
    updateVehicleManteinance,
    deleteVehicleManteinance
}