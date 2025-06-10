import { errors, validate } from 'com'
import { data } from '../data/index.js'

const { SystemError } = errors

export const saveLookSuggestion = (requestId, look, notes) => {
    validate.id(requestId, 'request id')
    validate.look(look, 'look')
    validate.string(notes, 'notes')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/lookSuggestions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requestId, look, notes })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}