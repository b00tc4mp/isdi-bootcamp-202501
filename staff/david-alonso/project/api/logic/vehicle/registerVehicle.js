import { errors, validate } from 'com'
import { Vehicle } from '../../data/models.js'

const { SystemError, DuplicityError } = errors

// REGISTRO DE VEHICULO
export const registerVehicle = (marca, modelo, año, color, matricula, km, itv, author) => {
    validate.text(marca, 'marca')
    validate.text(modelo, 'modelo')
    validate.number(año, 'año')
    validate.text(color, 'color')
    validate.matricula(matricula, 'matricula')
    validate.number(km, 'km')
    validate.date(itv, 'itv')

    return Vehicle.findOne({ $or: [{ matricula }] })

        .then(vehicle => {
            if (vehicle) throw new DuplicityError('vehicle already exists')
        })

        .then(() => {
            const vehicle = {
                marca,
                modelo,
                año,
                color,
                matricula,
                km,
                itv,
                author
            }

            return Vehicle.create(vehicle)
                .catch(error => {
                    if (error instanceof DuplicityError) throw error

                    throw new SystemError(error.message)
                })
        })

        .then(() => { })

}