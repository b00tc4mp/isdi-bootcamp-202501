import { UserDocType } from '../../../data/types'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'
import { User } from '../../../data/models'

const { SystemError, DuplicityError } = errors

const registerUser = (
    name: string,
    lastName: string,
    email: string,
    alias: string,
    level: string,
    password: string
): Promise<void> => {
    validate.name(name)
    validate.name(lastName)
    validate.email(email)
    validate.alias(alias)
    validate.password(password)

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            const newUser: Partial<UserDocType> = {
                name,
                lastName,
                email,
                alias,
                level: "beginner",
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