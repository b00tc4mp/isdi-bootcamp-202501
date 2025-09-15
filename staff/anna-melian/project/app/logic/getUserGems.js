import { data } from '../data/index.js'
import { errors } from 'com'

const { SystemError } = errors

export const getUserGems = () => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/users/self/gems`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        const { gems } = body

                        return gems
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