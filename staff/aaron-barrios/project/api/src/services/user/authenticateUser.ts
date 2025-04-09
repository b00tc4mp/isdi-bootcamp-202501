import { User } from '../../data/models.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, CredentialsError, NotFoundError } = errors

const authenticateUser = (
    alias: string,
    password: string
) => {
    validate.alias(alias)
    validate.password(password)

    return User.findOne({ alias }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found!')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('Wrong Credentials!')

                    return user._id.toString()
                })
        })
}

export default authenticateUser