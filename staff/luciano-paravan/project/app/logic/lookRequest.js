import { errors, validate } from "com"
import { data } from '../data/index.js'

const { SystemError } = errors

export const lookRequest = (contextOccasion, location, temperature, timeOfDay, style, additionalDetails, allowExternalSuggestions) => {
    validate.occasion(contextOccasion, 'context occasion')
    validate.location(location)
    validate.temperature(temperature)
    validate.timeOfDay(timeOfDay)
    validate.style(style)
    validate.string(additionalDetails, 'additional details')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/lookRequests`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contextOccasion, location, temperature, timeOfDay, style, additionalDetails, allowExternalSuggestions })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        return body
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