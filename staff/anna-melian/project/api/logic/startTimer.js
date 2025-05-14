import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError, TimerError } = errors

export const startTimer = (userId, timerId) => {
    validate.id(userId, 'userId')
    validate.id(timerId, 'timerId')

    let time

    return Promise.all([
        User.findById(userId).lean(),
        Timer.findById(timerId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, timer]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!timer) throw new NotFoundError('timer not found')

            if (timer.author.toString() !== userId) throw new OwnershipError('user is not author of timer')

            if (timer.startDate !== null) throw new TimerError('timer already start')

            time = timer.time

            return Timer.updateOne({ _id: timerId }, {
                $set: {
                    startDate: new Date,
                    status: 'active'
                }
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => time)
}