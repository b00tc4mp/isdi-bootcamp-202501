import { data } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { NotFoundError, CredentialsError, SystemError } = errors

export const authenticateUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    return data.users.findOne({ username })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('wrong credentials')

                    return user._id.toString()
                })
        })
}