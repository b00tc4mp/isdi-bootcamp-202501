import { data } from '../data'
import { validate } from './validate'

// import { CredentialsError } from '../errors'

export const loginUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    return fetch('http://localhost:8080/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new Error(error.message) }) // => steps in when port is incorrect or 
        .then(response => {                                 // api not thrown (FAILED TO FETCH)
            console.log(response.status)

            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new Error(error.message) }) // => steps in when the response is a non valid JSON
                    .then(body => {
                        const { id } = body

                        data.userId = id        // => HAPPY PATH
                    })

            return response.json()
                .catch(error => { throw new Error(error.message) }) // => steps in when route params are incorrect
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)                // => steps in when a wrongcred or unexistingUser is found
                })
        })
}