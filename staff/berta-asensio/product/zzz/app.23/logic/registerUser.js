import { validate } from './validate.js'

//ahora ya me puedo traer todos los errores. Al hacer export default, por defecto me trae todo lo que hay, asi que no hace falta corchetes.
import errors, { SystemError } from '../errors.js'

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