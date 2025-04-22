import { data } from '../../data'
import { errors } from 'com'

const { SystemError } = errors

export const deleteDiaryEntry = (entryId) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/diary/${entryId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
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
