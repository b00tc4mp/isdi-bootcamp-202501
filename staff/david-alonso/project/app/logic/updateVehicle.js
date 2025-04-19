import { errors, validate } from '../../com'
import { data } from '../data'

const { SystemError } = errors

// Funcion para Registrar al registro
export const updateVehicle = (id, marca, modelo, año, color, matricula, km, itv, author) => {
    const { token } = data

    validate.text(marca, 'marca')
    validate.text(modelo, 'modelo')
    validate.number(año, 'año')
    validate.text(color, 'color')
    validate.matricula(matricula, 'matricula')
    validate.number(km, 'km')
    validate.date(itv, 'itv')

    return fetch(`http://localhost:8080/vehicles/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ marca, modelo, año, color, matricula, km, itv, author })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 201)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError

                    throw new constructor(message)
                })
        })
}