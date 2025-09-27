import { User, LookRequest, LookSuggestion } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const saveLookSuggestion = (userId, requestId, look, notes) => {
    validate.id(userId, 'user id')
    validate.id(requestId, 'request id')
    validate.look(look, 'look')
    validate.text(notes, 'notes')

    return Promise.all([
        User.findById(userId).lean(),
        LookRequest.findById(requestId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, request]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!request) throw new NotFoundError('look request not found')

            return LookSuggestion.create({
                user: userId,
                request: requestId,
                look,
                notes
            })
        })
        .then(() => { })
}