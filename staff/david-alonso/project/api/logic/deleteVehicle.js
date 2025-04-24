import { errors, validate } from 'com'
import { User, Vehicle } from '../data/index.js'

const { SystemError, NotFoundError, OwnershipError } = errors

// REGISTRO DE VEHICULO
export const deleteVehicle = (userId, vehicleId) => {
    validate.id(userId, 'userId')
    validate.id(vehicleId, 'vehicleId')

    return Promise.all([
        User.findById(userId).lean(),
        Vehicle.findById(vehicleId)
    ])
        // Lanzamos un error si fallara la base de datos
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!vehicle) throw new NotFoundError('vehicle not found')

            if (vehicle.author.toString() !== userId) throw new OwnershipError('user is not author of vehicle')

            console.log('Métodos disponibles:', Object.keys(vehicle))
            // Elimina un documento en la colección data.vehicles cuyo _id coincida con vehicleObjectId
            return vehicle.deleteOne()
                .catch(error => { throw new SystemError(error.message) })
        })

        // Si todo va bien 
        .then(() => { console.log("Changes OK") })

}