import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

export const retrieveItems = (listId) => {
    validate.id(listId, 'listId')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/lists/${listId}/items`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200) return response.json()

            return response.json().then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
        })
}
