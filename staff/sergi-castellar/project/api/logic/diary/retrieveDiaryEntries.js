import { Couple, DiaryEntry, User } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const retrieveDiaryEntries = (userId) => {
    validate.id(userId, 'userId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return DiaryEntry.find({ couple: couple._id }).populate('author', '_id name').sort({ createdAt: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(entries => {
            return entries.map(entry => ({
                id: entry._id.toString(),
                author: {
                    id: entry.author._id.toString(),
                    name: entry.author.name
                },
                text: entry.text,
                own: entry.author._id.toString() === userId,
                createdAt: entry.createdAt
            }))
        })
}
