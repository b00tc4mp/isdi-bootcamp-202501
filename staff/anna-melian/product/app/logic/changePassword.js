import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors


export const changePassword = (actualPassword, newPassword) => {
    validate.password(actualPassword, 'actualPassword')
    validate.password(newPassword, 'newPassword')

    const { userId } = data

    return fetch(`http://localhost:8080/settings/password`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${userId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ actualPassword, newPassword })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {

            if (response.status === 204)
                return false

            if (response.status === 200)
                return true

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

}
