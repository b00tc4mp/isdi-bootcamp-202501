import { data } from '../../data'
import { errors } from 'com'

const { SystemError } = errors

export const retrieveCalendarEvents = (startDate, endDate) => {

    const { token } = data

    const params = new URLSearchParams({
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString()
    })

    return fetch(`${import.meta.env.VITE_API_URL}/couples/events?${params}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200) return response.json()
                .catch(error => {
                    throw new SystemError(error.message)
                })

            return response.json().then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
        })
}
