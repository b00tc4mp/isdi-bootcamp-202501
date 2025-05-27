import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createItem = (listId, text) => {
    validate.id(listId, 'listId')
    validate.textListItem(text, 'text')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/lists/${listId}/items`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
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
