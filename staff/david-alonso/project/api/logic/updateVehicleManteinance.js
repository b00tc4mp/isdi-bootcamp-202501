import { errors, validate } from 'com'
import { Manteinance } from '../data/models.js'

const { SystemError, DuplicityError } = errors

// REGISTRO DE VEHICULO
export const updateVehicleManteinance = (maintenanceId, fecha, descripcion, texto) => {
    validate.date(fecha, 'fecha')
    validate.text(descripcion, 'descripcion')
    validate.text(texto, 'texto')

    return Manteinance.updateOne({ _id: maintenanceId }, {
        $set: {
            fecha,
            descripcion,
            texto
        }
    })
        .catch(error => {
            if (error.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        })
        .then(() => { console.log('Changes OK') })

}