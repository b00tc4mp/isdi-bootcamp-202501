import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return fetch('http://localhost:8080/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new SystemError(error.message) }) // => steps in when port is incorrect or 
        .then(response => {                                 // api not thrown (FAILED TO FETCH)
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) }) // => steps in when the response is a non valid JSON
                    .then(body => {
                        const { token } = body

                        data.token = token        // => HAPPY PATH
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) }) // => steps in when route params are incorrect
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)                // => steps in when a wrongcred or unexistingUser is found
                })
        })
}