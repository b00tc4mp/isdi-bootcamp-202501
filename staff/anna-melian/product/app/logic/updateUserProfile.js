import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const updateUserProfile = (name, username, email) => {
    validate.text(name, 'name')
    validate.username(username, 'username')
    validate.email(email, 'email')

    const { userId } = data

    return fetch(`http://localhost:8080/settings/updated`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${userId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, email })
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




