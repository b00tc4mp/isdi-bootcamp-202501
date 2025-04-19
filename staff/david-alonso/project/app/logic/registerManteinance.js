
import { errors, validate } from '../../com'
import { data } from '../data'

const { SystemError } = errors

// Funcion para añadir Servicios de un vehiculo
export const registerManteinance = (vehicleId, fecha, descripcion, texto) => {
    const { token } = data

    validate.date(fecha, 'fecha')
    validate.text(descripcion, 'descripcion')
    validate.text(texto, 'texto')


    return fetch(`http://localhost:8080/manteinances`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ vehicleId, fecha, descripcion, texto })
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