import { data } from '../data/index.js'
import { errors } from 'com'

const { SystemError } = errors

export const getGlobalRanking = () => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/users/ranking`, {
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

                        ranking.forEach(user => {
                            user.position = user.position.toString()
                        })

                        return ranking
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
