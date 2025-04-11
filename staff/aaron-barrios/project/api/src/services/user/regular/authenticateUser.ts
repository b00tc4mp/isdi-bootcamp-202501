import bcrypt from 'bcryptjs'
import { User } from '../../../data/models'
import { errors, validate } from 'com'
import { AuthUserType } from '../../types'

const { SystemError, CredentialsError, NotFoundError } = errors

const authenticateUser = (
    alias: string,
    password: string
): Promise<AuthUserType> => {
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

                    return {
                        id: user._id.toString(),
                        role: user.role
                    }
                })
        })
}

export default authenticateUser