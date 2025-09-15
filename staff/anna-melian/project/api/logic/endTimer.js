import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError, TimerError } = errors

export const endTimer = (userId, timerId) => {
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

            let totalGems = 0
            let totalTime = timer.time
            let totalExtraTime = 0
            for (let i = 0; i < timer.extraTimes.length; i++) {
                totalExtraTime += timer.extraTimes[i]
            }

            totalGems = totalTime + totalExtraTime


            return Promise.all([
                Timer.updateOne({ _id: timerId }, {
                    $set: {
                        endDate: new Date(),
                        status: 'end'
                    }
                }),
                User.updateOne({ _id: userId }, {
                    $inc: { gems: totalGems }
                })
            ])
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })

        })
}