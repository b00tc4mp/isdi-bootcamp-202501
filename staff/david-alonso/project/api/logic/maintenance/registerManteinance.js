import { errors, validate } from 'com'
import { Manteinance } from '../../data/models.js'

const { SystemError, DuplicityError } = errors

export const registerManteinance = (vehicleId, fecha, descripcion, texto) => {
    validate.date(fecha, 'fecha')
    validate.text(descripcion, 'descripcion')
    validate.text(texto, 'texto')

    return Manteinance.findOne({ vehicleId, fecha, descripcion, texto })
        .then(exists => {
            if (exists) throw new DuplicityError('maintenance already exists')

            return Manteinance.create({ vehicleId, fecha, descripcion, texto })
        })
        .catch(error => {
            if (error instanceof DuplicityError) throw error

            throw new SystemError(error.message)
        })
}
