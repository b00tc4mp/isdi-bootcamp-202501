import { User, LookSuggestion } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getSavedLooks = (userId) => {
    validate.id(userId, 'user id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return LookSuggestion.find({ user: userId }).sort('-createdAt').lean()
        })
        .catch(error => {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                throw error

            throw new SystemError(error.message)
        })
}
