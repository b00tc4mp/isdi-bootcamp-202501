import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getUserUsername = userId => {
    validate(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError })
        .then(user => {
            if (!user) throw NotFoundError('user not found')

            return user.username
        })
}
