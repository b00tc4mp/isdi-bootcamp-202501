import { Couple, DiaryEntry } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export const updateDiaryEntry = (userId, entryId, text) => {
    validate.id(userId, 'userId')
    validate.id(entryId, 'entryId')
    validate.text(text, 1, 2000, 'text')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return DiaryEntry.findById(entryId)
                .catch(error => { throw new SystemError(error.message) })
                .then(entry => {
                    if (!entry) throw new NotFoundError('Diary entry not found')
                    if (!entry.couple.equals(couple._id)) throw new AuthorizationError('Couple is not the owner of the diary entry')

                    entry.text = text.trim()
                    entry.modifiedAt = new Date()

                    return entry.save().catch(error => { throw new SystemError(error.message) })
                })
        })
}
