import { errors, validate } from 'com'
import { Vehicle } from '../data/models.js'

const { SystemError, DuplicityError } = errors

export const updateVehicle = (id, marca, modelo, año, color, matricula, km, itv, author) => {
    validate.text(marca, 'marca')
    validate.text(modelo, 'modelo')
    validate.number(año, 'año')
    validate.text(color, 'color')
    validate.matricula(matricula, 'matricula')
    validate.number(km, 'km')
    validate.date(itv, 'itv')

    return Vehicle.updateOne({ _id: id }, {
        $set: {
            marca,
            modelo,
            año,
            color,
            matricula,
            km,
            itv
        }
    })
        .catch(error => {
            if (error.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        })
        .then(() => { })

}