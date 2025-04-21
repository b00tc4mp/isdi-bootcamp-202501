import { data } from '../../data'
import { errors } from 'com'

const { SystemError } = errors

export const deleteCalendarEvent = (eventId) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/events/${eventId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) return

            return res.json().then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
        })
}
