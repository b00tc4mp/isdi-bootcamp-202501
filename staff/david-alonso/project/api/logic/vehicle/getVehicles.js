// OBTENER PUBLICACIONES
import { User, Vehicle } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

// Funcion para Obtener los Vehiculos
export const getVehicles = userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Vehicle.find({ author: userId }).sort('-createdAt').lean()

    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, vehicles]) => {

            if (!user) throw new NotFoundError('user not found')

            vehicles.forEach(vehicle => {
                vehicle.id = vehicle._id.toString()
                delete vehicle._id

                if (vehicle.author._id) {
                    vehicle.author.id = vehicle.author._id.toString()
                    delete vehicle.author._id
                }

                vehicle.own = vehicle.author.id === userId

            })

            return vehicles
        })

}

