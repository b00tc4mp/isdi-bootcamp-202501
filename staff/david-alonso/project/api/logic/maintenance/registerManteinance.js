import { errors, validate } from 'com'
import { Manteinance } from '../../data/models.js'

const { SystemError, DuplicityError } = errors

export const registerManteinance = (vehicleId, fecha, km, descripcion, texto, image) => {
    validate.date(fecha, 'fecha')
    validate.number(km, 'km')
    validate.text(descripcion, 'descripcion')
    validate.text(texto, 'texto')

    if (image) {
        validate.url(image)
        validate.maxLength(image, 500, 'image')
    }

    return Manteinance.findOne({ vehicleId, fecha, km, descripcion, texto, image })
        .then(exists => {
            if (exists) throw new DuplicityError('maintenance already exists')

            return Manteinance.create({ vehicleId, fecha, km, descripcion, texto, image })
        })
        .catch(error => {
            if (error instanceof DuplicityError) throw error

            throw new SystemError(error.message)
        })
}
