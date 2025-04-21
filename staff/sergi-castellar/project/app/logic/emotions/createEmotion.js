import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createEmotion = (emotion) => {
    //TODO validate.emotion(emotion, 'emotion')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/emotions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emotion })
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
