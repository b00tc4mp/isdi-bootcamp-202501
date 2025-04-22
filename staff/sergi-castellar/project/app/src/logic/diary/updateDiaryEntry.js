import { data } from '../../data'
import { errors } from 'com'

const { SystemError } = errors

export const updateDiaryEntry = (entryId, text) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/diary/${entryId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 204) return
            return response.json().then(body => {
                const { error, message } = body
                throw new errors[error](message)
            })
        })
}
