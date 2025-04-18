import { data } from '../data'
import { errors } from 'com'

const { SystemError } = errors

export const joinWithInviteCode = code => {
    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/couples/join`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => {
                        console.log('body :>> ', body);
                        const { couple } = body

                        return couple
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