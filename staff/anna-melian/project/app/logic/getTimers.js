import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const getTimers = () => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/timers`, {
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
                        const timers = body

                        timers.forEach(timer => {
                            timer.createdAt = new Date(timer.createdAt)
                        })

                        return timers
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