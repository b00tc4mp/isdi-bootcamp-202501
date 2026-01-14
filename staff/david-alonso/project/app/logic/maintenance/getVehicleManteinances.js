import { data } from '../../data/index.js'

import errors from '../../../com/errors.js'
import { logic } from '../index.js'

const { SystemError } = errors

// Funcion para Obtener los Mantenimientos de un Vehiculo
export const getVehicleManteinances = () => {

    const { token } = data
    const userId = logic.getUserId()

    return fetch(`${import.meta.env.VITE_API_URL}/manteinances/${vehicleId}`, {
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
                        const manteinances = body

                        manteinances.forEach(maintenance => {
                            maintenance.createdAt = new Date(maintenance.createdAt)
                            if (maintenance.modifiedAt) maintenance.modifiedAt = new Date(maintenance.modifiedAt)
                        })

                        return manteinances
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