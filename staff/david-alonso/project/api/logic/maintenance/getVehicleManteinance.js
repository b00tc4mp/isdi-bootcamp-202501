// OBTENER PUBLICACIONES
import { Manteinance, Vehicle } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

// Funcion para Obtener los Mantenimientos de un vehiculo
export const getVehicleManteinances = vehicleId => {
    validate.id(vehicleId, 'vehicleId')

    return Promise.all([
        Vehicle.findById(vehicleId).lean(),
        Manteinance.find({ vehicleId }).sort('-createdAt').lean()

    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([vehicle, manteinances]) => {

            if (!vehicle) throw new NotFoundError('vehicle not found')

            return manteinances
        })

}

