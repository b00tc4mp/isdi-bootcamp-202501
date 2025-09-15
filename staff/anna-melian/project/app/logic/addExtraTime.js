import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const addExtraTime = (timerId, timeExtra) => {
    validate.id(timerId, 'timerId')
    validate.time(timeExtra, 'timeExtra')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/timers/${timerId}/extraTime`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timeExtra })

    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {

            if (response.status === 204)
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