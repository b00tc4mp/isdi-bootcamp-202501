import { data } from '../data'
import { errors } from 'com'

const { SystemError } = errors

export const setCoupleStartDate = (dateStart) => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/date-start`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ dateStart })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 204) return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
