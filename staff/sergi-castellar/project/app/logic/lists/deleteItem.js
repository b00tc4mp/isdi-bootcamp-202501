import { data } from '../../data'
import { errors, validate } from 'com'

const { SystemError } = errors

export const deleteItem = (itemId) => {
    validate.id(itemId, 'itemId')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/items/${itemId}`, {
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
