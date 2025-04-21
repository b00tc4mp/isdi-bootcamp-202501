import { User } from '../../data/index.js'
import { validate, errors } from 'com'
import bcrypt from 'bcryptjs'

const { DuplicityError, SystemError } = errors

export const registerUser = (name, email, username, password) => {
    validate.name(name, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

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
                    if (error.code === 11000) throw new DuplicityError('User already exists')

                    throw new SystemError(error.message)
                })
        })
        .then(() => { })
}