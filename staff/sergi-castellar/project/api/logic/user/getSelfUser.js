import { User } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getSelfUser = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt,
                modifiedAt: user.modifiedAt
            }
        })
}