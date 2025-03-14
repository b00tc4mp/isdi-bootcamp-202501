import { data } from '../data/index.js'
import { validate } from './validate.js'

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
        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new Error(error.message) })
                    .then(body => {
                        const { id } = body

                        data.userId = id
                    })

            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}