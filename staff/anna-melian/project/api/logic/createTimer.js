import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const createTimer = (userId, time, pause, tag) => {
    validate.id(userId, 'userId')
    validate.time(time, 'time')
    validate.tag(tag, 'tag')
    validate.pause(pause, 'pause')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const timer = {
                author: userId,
                time: time,
                pause: pause,
                tag: tag,
            }

            return Timer.create(timer)
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(() => { })
}