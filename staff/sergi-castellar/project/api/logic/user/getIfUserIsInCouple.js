import { Couple } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const getIfUserIsInCouple = (userId) => {
    validate.id(userId, 'userId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            return !!couple
        })
}
