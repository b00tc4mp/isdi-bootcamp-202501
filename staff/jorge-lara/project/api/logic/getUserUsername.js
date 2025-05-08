import { User } from "../data/index.js"
import { errors } from 'com'

const { SystemError, NotFoundError } = errors;

export const getUserUsername = userId => {

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            if (!user) {
                throw new NotFoundError('user not found');
            }

            return user.username;
        })
}