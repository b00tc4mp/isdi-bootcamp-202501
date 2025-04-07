
import { data } from '../data/index.js'

import { errors, validate } from 'com'

const { SystemError, NotFoundError, CredentialsError } = errors

// Funcion para Iniciar sesion
export const authenticateUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    // Busca y devuelve un usuario en data.users cuyo username coincida con el valor proporcionado
    return data.users.findOne({ username })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            // Si el user no existe lanza un error
            if (!user) throw new NotFoundError('user not found')

            // Si el Password no coincide, lanza un error
            if (user.password !== password) throw new CredentialsError('wrong credentials')

            // Convierte el _id del objeto user (que es un ObjectId) en una cadena (string)
            return user._id.toString()

        })

}