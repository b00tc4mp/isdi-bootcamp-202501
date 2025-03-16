import { validate } from './validate.js'

// import { DuplicityError } from '../errors.js'

export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name')
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, username, password })
    })
        .catch(error => { throw new Error(error.message) }) // => steps in when port is incorrect or 
        .then(response => {                                    // api not thrown (FAILED TO FETCH)
            console.log(response.status)

            if (response.status === 201)
                return                  // => HAPPY PATH

            return response.json()
                .catch(error => { throw new Error(error.message) }) // => steps in when fetch route params are incorrect
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)                        // => steps in when a duplicity is found
                })
        })
}