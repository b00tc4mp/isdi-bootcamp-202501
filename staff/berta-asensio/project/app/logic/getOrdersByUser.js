import { data } from '../data'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export const getOrdersByUser = (userId) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/orders/${userId}`, {
        method: 'GET',
        headers: {
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
