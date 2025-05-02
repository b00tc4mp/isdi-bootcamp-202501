import { errors, validate } from '../../com'
import { data } from '../data'

const { SystemError } = errors

export const deleteVehicleManteinance = (id) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/manteinances/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 204)
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