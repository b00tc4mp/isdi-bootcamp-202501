import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createOrder = (menuId, bread) => {
    validate.id(menuId, 'menuId')
    validate.string(bread, 'bread')
    validate.maxLength(bread, 25, 'bread')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({ menuId, bread })
    })

    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
        if(response.status === 201)
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