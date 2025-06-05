import { errors, validate } from 'com'

const { SystemError } = errors

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

        .catch(error => { throw new SystemError(error.message) }) //Si falla conexión
        .then(response => {
            
            if(response.status === 201)
                return
            
            return response.json()
                .catch(error => { throw new SystemError(error.message) }) //si falla json de respuesta
                .then(body => {
                    const { error, message } = body
                    //extraigo la constructora correcta
                    const constructor = errors[error]
                    //y aqui uso la constructora
                    throw new constructor(message)
                })
        })
}