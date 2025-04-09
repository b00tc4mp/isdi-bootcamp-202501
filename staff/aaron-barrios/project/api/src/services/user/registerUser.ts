import { IUser, User } from '../../data/models.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, DuplicityError } = errors

const registerUser = (
    name: string,
    lastName: string,
    alias: string,
    email: string,
    password: string
) => {
    validate.name(name)
    validate.name(lastName)
    validate.alias(alias)
    validate.email(email)
    validate.password(password)

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            const newUser: Partial<IUser> = {
                name,
                lastName,
                email,
                alias,
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