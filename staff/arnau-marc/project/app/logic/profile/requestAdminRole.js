import { data } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, AuthorizationError } = errors

export const requestAdminRole = (secretWord) => {
    validate.string(secretWord, 'secret word')

    return data.token
    .then(token => {
        if (!token) {
          throw new AuthorizationError('Token not found')
        }
        return fetch(`http://localhost:8080/profiles/admin-request`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secretWord })
        })
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