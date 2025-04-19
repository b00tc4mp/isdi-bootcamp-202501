
import { errors, validate } from 'com'
import { Manteinance } from '../data/models.js'

const { SystemError, DuplicityError } = errors

// REGISTRO DE VEHICULO
export const registerManteinance = (vehicleId, fecha, descripcion, texto) => {

    validate.date(fecha, 'fecha')
    validate.text(descripcion, 'descripcion')
    validate.text(texto, 'texto')

    const service = {
        vehicleId,
        fecha,
        descripcion,
        texto
    }
    return Manteinance.create(service)
        .catch(error => {
            if (error.code === 11000) throw new DuplicityError('service already exists')

            throw new SystemError(error.message)
        })

        .then(() => { console.log('Changes OK') })

}