import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export const getUserName = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.name
        })
}