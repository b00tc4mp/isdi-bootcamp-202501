import { errors, validate } from '../../com'
import { data } from '../data'

const { SystemError } = errors

// Funcion para Registrar al registro
export const deleteVehicle = (vehicleId) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/vehicles/${vehicleId}`, {
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