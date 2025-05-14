import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError, TimerError } = errors

export const pauseTimer = (userId, timerId) => {
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

            if (timer.status !== 'active' && timer.status !== 'extraTime') throw new TimerError('timer is not active or in extraTime')

            if (timer.pausesCount >= 8) throw new TimerError('maximum number of pauses reached')


            return Timer.updateOne({ _id: timerId }, {
                $set: {
                    status: 'pause',
                },
                $inc: { pausesCount: 1 }
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}