import { data } from '../data'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export const getMenusByCategory = (categories) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/menus/${categories}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
        if (response.status === 200) {
            return response.json()
                .catch(error => { throw new SystemError(error.message) })
        }
        return response.json()
            .catch(error => { throw new SystemError(error.message) })
            .then(body => {
                const { error, message } = body
                const constructor = errors[error]

                throw new constructor(message)
            })
    })
}
