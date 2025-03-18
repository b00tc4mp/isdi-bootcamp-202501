import { validate } from './validate.js'

//import { DuplicityError } from '../errors.js'

export const registerUser = (name, username, password, email) => {
    validate.name(name, 'name')
    validate.username(username, 'username')
    validate.password(password, 'password')
    validate.email(email, 'email')

    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, password, email })
    })

        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)

            if(response.status === 201)
                return
            
            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}