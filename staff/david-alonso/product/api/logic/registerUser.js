// REGISTRAR USUARIO 

import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, DuplicityError } = errors

// Funcion para Registrar al usuario
export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name')
    validate.maxLength(name, 30, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    // Busca y devuelve un usuario en data.users cuyo Email o Username coincida con los valores dados
    return data.users.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('user already exists')

            user = {
                name: name,
                email: email,
                username: username,
                password: password,
                createdAt: new Date(),
                modifiedAt: null
            }

            // Inserta el objeto user en la colección data.users y devuelve el resultado
            return data.users.insertOne(user)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists')

                    throw new SystemError(error.message)
                })
        })
        // Si todo va bien 
        .then(() => { console.log("Changes OK") })
}