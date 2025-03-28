import { User } from '../data/index.js'
import { errors, validate } from 'com'
import { Types } from 'mongoose';

const { ObjectId } = Types;
const { SystemError, NotFoundError } = errors;

export const getUserName = userId => {
    validate.id(userId, 'userId');

    return User.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            if (!user) {
                throw new NotFoundError('user not found');
            }

            return user.name;
        })
}