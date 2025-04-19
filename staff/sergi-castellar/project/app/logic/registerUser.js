import { errors, validate } from 'com'

const { SystemError, NoMatchError } = errors

export const registerUser = (name, email, username, password, password2) => {
    validate.name(name, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    if (password != password2) throw new NoMatchError('Passwords do not match')

    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, username, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 201) return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
