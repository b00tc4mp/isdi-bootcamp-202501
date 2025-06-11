import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const addUserCredit = (amount) => {
    validate.number(amount, 'amount')
    validate.minValue(amount, 0.50, 'amount')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/users/self/credit`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        const { credit } = body

                        return credit
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}