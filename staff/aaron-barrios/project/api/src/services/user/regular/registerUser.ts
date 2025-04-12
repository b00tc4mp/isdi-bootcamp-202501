import { UserDocType } from '../../../data/types'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'
import { User } from '../../../data/models'

const { SystemError, DuplicityError } = errors

const registerUser = (
    alias: string,
    email: string,
    password: string
): Promise<void> => {
    validate.alias(alias)
    validate.email(email)
    validate.password(password)

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            const newUser: Partial<UserDocType> = {
                alias,
                email,
                password: hash
            }

            return User.create(newUser)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('User already exists!')

                    throw new SystemError(error.message)
                })
        })
        .then(() => { })
}

export default registerUser