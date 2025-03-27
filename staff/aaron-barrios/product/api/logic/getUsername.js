import { Types } from 'mongoose'
import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = Types
const { SystemError, NotFoundError } = errors

export const getUsername = userId => {
    validate.id(userId, 'userId')

    return User.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) }) //=> steps into when mongo fails (db fell off, etc.)
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.name
        })
}