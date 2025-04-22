import { Couple, DiaryEntry, User } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const retrieveDiaryEntries = (userId) => {
    validate.id(userId, 'userId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return DiaryEntry.find({ couple: couple._id }).populate('author', 'name').sort({ createdAt: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
}
