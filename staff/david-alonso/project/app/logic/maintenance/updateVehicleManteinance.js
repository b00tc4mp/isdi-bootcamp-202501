import { errors, validate } from '../../../com'
import { data } from '../../data'

const { SystemError } = errors

export const updateVehicleManteinance = (id, fecha, km, descripcion, texto, image) => {
    const { token } = data

    validate.date(fecha, 'fecha')
    validate.text(descripcion, 'descripcion')
    validate.text(texto, 'texto')
    validate.url(image)
    validate.maxLength(image, 1000, 'image')

    return fetch(`${import.meta.env.VITE_API_URL}/manteinances/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ fecha, km, descripcion, texto, image })
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