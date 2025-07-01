import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError } = errors

export const getUserName = userId => {
    validate.id(userId, 'userId')

    return data.users.findOne({ _id: new ObjectId(userId) }) //se le pasa el string userId
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.name

        })
}