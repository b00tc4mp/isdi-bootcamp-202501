import {User} from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, CredentialsError, NotFoundError } = errors

export const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({username}).lean()
        .catch(error => { throw new SystemError(error.message)} )
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message)} )
                .then(match => {
                    if (!match) throw new CredentialsError('Wrong credentials!')

                    return user._id.toString() // => to mask the db we are using
                })
        })
}
