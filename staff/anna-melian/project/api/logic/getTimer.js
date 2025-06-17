import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors


export const getTimer = (userId, timerId) => {
    validate.id(userId, 'userId')
    validate.id(timerId, 'timerId')

    return Promise.all([
        User.findById(userId).lean(),
        Timer.findById(timerId).lean(),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, timer]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!timer) throw new NotFoundError('timer not found')

            const newTimer = {
                id: timer._id.toString(),
                author: timer.author.toString(),
                time: timer.time,
                status: timer.status,
                pauseTime: timer.pauseTime,
                extraTimes: timer.extraTimes,
                tag: timer.tag
            }
            return newTimer
        })
}