import { data } from '../data'
import { errors } from 'com'

const { SystemError } = errors

export const getCoupleEvents = (startDate, endDate) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/self/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
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
                        const { events } = body

                        return events
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