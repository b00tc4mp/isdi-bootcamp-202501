import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createCalendarEvent = (eventDate, title, description) => {
    validate.text(eventDate, 'eventDate')
    validate.titleCalendarEvent(title, 'title')
    validate.descriptionCalendarEvent(description, 'description')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventDate, title, description })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) return

            return response.json().then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
        })
}
