import { data } from '../../data'
import { errors } from 'com'

const { SystemError } = errors

export const updateCalendarEvent = (eventId, title, description) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/events/${eventId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 204) return

            return response.json().then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
        })
}
