import { errors, validate } from 'com'
import { User } from '../../data/index.js'
import bcrypt from 'bcryptjs'

const { SystemError, NotFoundError, CredentialsError } = errors

export const authenticateUser = (username, password) => {
    validate.username = (username)
    validate.password = (password)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message)})
        .then(user=>{
            if(!user) throw new NotFoundError(error.message)

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new CredentialsError(error.message)})
                .then(match => {
                    if(!match) throw new CredentialsError('Wrong credentials')

                    return user._id.toString()
                })
        })
}
