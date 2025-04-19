import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createTimer = (time, pauseTime, tag) => {
    validate.time(time, 'time')
    validate.pauseTime(pauseTime, 'pauseTime')
    validate.tag(tag, 'tag')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/timers`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time, pauseTime, tag })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) {
                return response.json()
                    .then(body => {
                        return body.id
                    })
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
