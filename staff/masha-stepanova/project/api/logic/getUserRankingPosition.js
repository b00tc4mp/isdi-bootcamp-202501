import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getUserRankingPosition = (userId) => {
    validate.id(userId)

    return Promise.all([
        User.find().select('score username').lean(),
        User.findOne({ _id: userId }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([allUsers, currentUser]) => {
            if (!currentUser) throw new NotFoundError('user not found')

            allUsers.sort((a, b) => a.score - b.score)

            console.log(allUsers)
        })
}