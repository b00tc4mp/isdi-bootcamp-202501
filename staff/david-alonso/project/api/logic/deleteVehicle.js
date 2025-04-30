import { errors, validate } from 'com'
import { Vehicle } from '../data/index.js'

const { SystemError } = errors

export const deleteVehicle = (vehicleId) => {
    validate.id(vehicleId, 'vehicleId')

    return Vehicle.deleteOne({ _id: vehicleId })
        .then(result => {
            if (result.deletedCount === 0)
                throw new SystemError('vehicle not found')

        })
        .catch(error => { throw new SystemError(error.message) })
}