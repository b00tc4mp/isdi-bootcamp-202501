import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const checkUserTimers = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Timer.findOne({ author: userId, status: { $not: { $in: ['end', 'exit'] } } })
                .then(timerOn => {

                    if (!timerOn) {
                        return undefined
                    }

                    return timerOn._id.toString()
                })
                .catch(error => { throw new SystemError(error.message) })

        })
}