import { errors, validate } from '../../com'
import { data } from '../data'

const { SystemError } = errors

export const updateVehicleManteinance = (id, fecha, descripcion, texto) => {
    const { token } = data

    validate.date(fecha, 'fecha')
    validate.text(descripcion, 'descripcion')
    validate.text(texto, 'texto')

    return fetch(`${import.meta.env.VITE_API_URL}/manteinances/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ fecha, descripcion, texto })
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