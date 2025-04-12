import { data } from '../data'
import { errors } from 'com'

const { SystemError } = errors

export const getUserName = () => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/users/self/name`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch((error) => { throw new SystemError(error.message) })
        .then((response) => {
            if (response.status === 200)
                return response
                    .json()
                    .catch((error) => { throw new SystemError(error.message) })
                    .then((body) => {
                        const { name } = body 

                        return name
                    })
            return response
                .json()
                .catch((error) => { throw new SystemError(error.message) })
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}