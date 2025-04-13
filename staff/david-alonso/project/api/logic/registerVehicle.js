import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'
import { Vehicle } from '../data/models.js'

const { SystemError, DuplicityError } = errors

// REGISTRO DE VEHICULO
export const registerVehicle = (marca, modelo, año, matricula, km, itv) => {
    validate.text(marca, 'marca')
    validate.text(modelo, 'modelo')
    validate.number(año, 'año')
    validate.text(matricula, 'matricula')
    validate.number(km, 'km')
    validate.date(itv, 'itv')


    // *****
    return Vehicle.findOne({ $or: [{ matricula }] })
        .then(vehicle => {
            if (vehicle) throw new DuplicityError('vehicle already exists')

            return
        })
        .catch(error => { throw new SystemError(error.message) })

        .then(() => {
            const vehicle = {
                marca,
                modelo,
                año,
                matricula,
                km,
                itv
            }

            // Inserta el objeto vehicle en la colección data.vehicles y devuelve el resultado
            return Vehicle.create(vehicle)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists')

                    throw new SystemError(error.message)
                })
        })

        .then(() => { console.log('Changes OK') })

}