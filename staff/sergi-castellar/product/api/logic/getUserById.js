import { User } from '../data/index.js';
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getUserById = (userId) => {
    validate.id(userId, 'id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user
        })
};
