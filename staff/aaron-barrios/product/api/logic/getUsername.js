import { data } from '../data/index.js'
import { errors, validate } from 'com'

const {ObjectId} = data
const { SystemError, NotFoundError } = errors

export const getUsername = userId => {
    validate.id(userId, 'userId')

    return data.users.findOne({_id: new ObjectId(userId)})
        .catch(error => {throw new SystemError(error.message)}) //=> steps into when mongo fails (db fell off, etc.)
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.name
        })
}