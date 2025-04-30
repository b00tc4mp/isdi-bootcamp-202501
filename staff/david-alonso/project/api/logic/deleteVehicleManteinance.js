import { Manteinance } from '../data/models.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const deleteVehicleManteinance = (maintenanceId) => {

    validate.id(maintenanceId, 'maintenanceId')

    return Manteinance.deleteOne({ _id: maintenanceId })
        .catch(error => { throw new SystemError(error.message) })


        // Si todo va bien 
        .then(() => { })

}