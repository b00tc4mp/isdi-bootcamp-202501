import { data } from '../data/index.js';
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError } = errors

export const getUserById = (userId) => {
    validate.id(userId, 'id')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user
        })
};
