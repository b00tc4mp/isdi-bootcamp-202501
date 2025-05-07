import { data } from '../../data/index.js'

import errors from '../../../com/errors.js'
import { logic } from '../index.js'

const { SystemError } = errors

// Funcion para Obtener los Vehiculos
export const getVehicles = () => {

    const { token } = data
    const userId = logic.getUserId()

    return fetch(`${import.meta.env.VITE_API_URL}/vehicles/user/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {

            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        const vehicles = body

                        vehicles.forEach(vehicle => {
                            vehicle.createdAt = new Date(vehicle.createdAt)
                            if (vehicle.modifiedAt) vehicle.modifiedAt = new Date(vehicle.modifiedAt)
                        })

                        return vehicles
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {

                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}