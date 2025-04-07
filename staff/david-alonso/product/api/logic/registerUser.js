// REGISTRAR USUARIO 

import { User } from '../data/index.js' //** */
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'  //** */

const { SystemError, DuplicityError } = errors

// Funcion para Registrar al usuario
export const registerUser = (name, email, username, password) => {
    validate.text(name)
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email)
    validate.username(username)
    validate.password(password)

    // Busca y devuelve un usuario en data.users cuyo Email o Username coincida con los valores dados

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })

        .then(hash => {
            const user = {
                name: name,
                email: email,
                username: username,
                password: hash
            }

            // Inserta el objeto user en la colección data.users y devuelve el resultado
            return User.create(user)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists')

                    throw new SystemError(error.message)
                })

        })

        // Si todo va bien 
        .then(() => { console.log("Changes OK") })
}