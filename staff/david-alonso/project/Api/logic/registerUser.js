import { User } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, DuplicityError } = errors

// REGISTRO DE USUARIO
export const registerUser = (name, email, password) => {
    validate.text(name)
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email)
    validate.password(password)

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })

        .then(has => {
            const user = {
                name: name,
                email: email,
                password: hash
            }

            // Inserta el objeto user en la colección data.users y devuelve el resultado
            return User.create(user)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists')

                    throw new SystemError(error.message)
                })
        })

        .then(() => { console.log('Changes OK') })

}