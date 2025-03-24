/*
import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const deleteProfile = () => {
    const { userId } = data

    return fetch(`http://localhost:8080/profile/delete`, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${userId}`
        }
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

*/