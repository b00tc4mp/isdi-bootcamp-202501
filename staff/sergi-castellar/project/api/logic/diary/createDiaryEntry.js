import { Couple, DiaryEntry } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const createDiaryEntry = (userId, text) => {
    validate.id(userId, 'userId')
    validate.text(text, 1, 2000, 'text')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return DiaryEntry.create({
                couple: couple._id,
                author: userId,
                text: text.trim()
            })
                .catch(error => { throw new SystemError(error.message) })
        })
}
