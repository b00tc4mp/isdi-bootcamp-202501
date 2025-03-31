// Funcion para Iniciar sesion

import { User } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, NotFoundError, CredentialsError } = errors

// Esta función autentica a un usuario con un nombre de usuario (username) y una contraseña (password)
export const authenticateUser = (username, password) => {

    // Comprobamos que sean validos
    validate.username(username)
    validate.password(password)

    // Busca en la base de datos un usuario con el nombre de usuario dado.    
    return User.findOne({ username }).lean()

        // Si falla la busqueda lanza un error
        .catch(error => { throw new SystemError(error.message) })

        // Si user no se encontró en la base de datos, lanza un NotFoundError
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // Compara la contraseña proporcionada con la almacenada en la base de datos (que está cifrada)
            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })

                // Si la contraseña es incorrecta, lanza un error
                .then(match => {
                    if (!match) throw new CredentialsError('wrong credentials')

                    // Si la contraseña es correcta, la función retorna el ID del usuario en formato de cadena (String)
                    return user._id.toString()
                })
        })

}