import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError, TimerError } = errors

export const deleteTimer = (userId, timerId) => {
    validate.id(userId, 'userId')
    validate.id(timerId, 'timerId')

    return Promise.all([
        User.findById(userId).lean(),
        Timer.findById(timerId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, timer]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!timer) throw new NotFoundError('timer not found')

            if (timer.author.toString() !== userId) throw new OwnershipError('user is not author of timer')

            if (timer.status !== 'created') throw new TimerError('timer is active or finish and not able to delete')

            return Timer.deleteOne({ _id: timerId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}