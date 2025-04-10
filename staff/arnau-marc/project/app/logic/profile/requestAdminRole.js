import { data } from '../data/index.js'
//import { errors, validate } from 'com'

//const { SystemError } = errors

export const requestAdminRole = (secretWord) => {
  //  validate.string(secretWord, 'secret word')

    return data.token
    .then(token => {
        if (!token) {
          throw new Error('Token not found')
        }
        return fetch(`http://localhost:8080/users/admin-request`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secretWord })
        })
    })
    .catch(error => { throw new Error(error.message) })
    .then(response => {
        if (response.status === 204) return

        return response.json()
            .catch(error => { throw new Error(error.message) })
            .then(body => {
                const { error, message } = body
                const constructor = errors[error] || Error
                throw new constructor(message)
            })
    })
}