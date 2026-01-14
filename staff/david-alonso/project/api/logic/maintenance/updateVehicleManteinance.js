import { errors, validate } from 'com'
import { Manteinance } from '../../data/models.js'

const { SystemError, DuplicityError } = errors

// REGISTRO DE VEHICULO
export const updateVehicleManteinance = (maintenanceId, fecha, km, descripcion, texto, image) => {
    validate.date(fecha, 'fecha')
    validate.number(km, 'km')
    validate.text(descripcion, 'descripcion')
    validate.text(texto, 'texto')
    validate.url(image)
    validate.maxLength(image, 1000, 'image')

    return Manteinance.updateOne({ _id: maintenanceId }, {
        $set: {
            fecha,
            km,
            descripcion,
            texto,
            image
        }
    })
        .catch(error => {
            if (error.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        })
        .then(() => { })

}