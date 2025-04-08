import { errors, validate } from 'com'

const { SystemError } = errors

export const registerUser = (name, username, password, email) => {
    validate.name(name)
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.username(username)
    validate.password(password)
    validate.email(email)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
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