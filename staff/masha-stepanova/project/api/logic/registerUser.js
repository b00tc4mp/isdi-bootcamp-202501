import { validate, errors } from 'com'
import { User } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { DuplicityError, SystemError, PasswordValidationError } = errors

export const registerUser = (name, email, username, password, repeatedPassword) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(repeatedPassword)

    if (password !== repeatedPassword) throw new PasswordValidationError('Password does not match the repeated password')

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            const user = {
                name: name,
                email: email,
                username: username,
                password: hash
            }

            return User.create(user)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists')

                    throw new SystemError(error.message)
                })
        })
        .then(() => { })
}