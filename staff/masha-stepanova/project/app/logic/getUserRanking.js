import { data } from '../data'
import { errors } from 'com'

const { SystemError } = errors

export const getUserRanking = () => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/users/ranking/self`, {
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
                        const ranking = body

                        const userRanking = {
                            username: ranking.username,
                            position: ranking.position.toString()
                        }

                        return userRanking
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