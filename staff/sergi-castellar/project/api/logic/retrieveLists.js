import { Couple, List } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const retrieveLists = (userId) => {
    validate.id(userId, 'userId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('couple not found')

            return List.find({ couple: couple._id })/*.populate('items')//TODO*/.lean()
                .catch(error => { throw new SystemError(error.message) })
        })
}
