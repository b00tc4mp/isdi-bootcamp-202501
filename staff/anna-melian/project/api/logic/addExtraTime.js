import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError, TimerError } = errors

export const addExtraTime = (userId, timerId, timeExtra) => {
    validate.id(userId, 'userId')
    validate.id(timerId, 'timerId')
    validate.time(timeExtra, 'timeExtra')

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

            let time = timer.time
            let totalExtraTime = timeExtra
            for (let i = 0; i < timer.extraTimes.length; i++) {
                totalExtraTime += timer.extraTimes[i]
            }

            let totalTime = time + totalExtraTime

            if (totalTime > 240) throw new TimerError('maximum time reached for timer')

            return Timer.updateOne({ _id: timerId }, {
                $set: {
                    status: 'extraTime'
                },
                $push: { extraTimes: timeExtra }
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}