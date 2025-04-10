import { User } from '../data/models'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, NotFoundError, CredentialsError } = errors

export const authenticateUser = (email, password) => {

    validate.email(email, 'email')
    validate.password(password, 'password')

    // ?????
    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })

        // Si user no se encontró en la base de datos, lanza un NotFoundError
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