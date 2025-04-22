import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

export const updateList = (listId, title, color) => {
    validate.id(listId, 'listId')
    validate.notBlankString(title, 'title')
    validate.color(color, 'color')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/lists/${listId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, color })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 204)
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
