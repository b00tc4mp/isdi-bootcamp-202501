import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

export const retrieveDiaryEntry = (entryId) => {
    validate.id(entryId, 'entryId')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/diary/${entryId}`, {
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
                throw new errors[error](message)
            })
        })
}
