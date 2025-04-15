import { Couple, User } from '../data/index.js'
import { errors } from 'com'
const { SystemError, NotFoundError } = errors

export const getOwnCouple = (userId) => {
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Couple.findOne({ members: userId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(couple => {
                    if (!couple) throw new NotFoundError('couple not found')

                    return couple
                })
        })
}