import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError, TimerError } = errors

export const resumeTimer = (userId, timerId) => {
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

            if (timer.startDate === null) throw new TimerError('timer has not start')

            if (timer.endDate !== null) throw new TimerError('timer already end')

            if (timer.status !== 'pause') throw new TimerError('timer is not paused')

            let newStatus = 'active'

            const extraTimes = timer.extraTimes || []

            if (extraTimes.length > 0) {
                newStatus = 'extraTime'
            }

            return Timer.updateOne({ _id: timerId }, {
                $set: {
                    status: newStatus,
                }
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}