import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, DuplicityError } = errors

export const createTimer = (userId, time, pauseTime, tag) => {
    validate.id(userId, 'userId')
    validate.time(time, 'time')
    validate.tag(tag, 'tag')
    validate.pauseTime(pauseTime, 'pause')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Timer.findOne({ author: userId, status: 'created' })
                .catch(error => { throw new SystemError(error.message) })
                .then(oldTimer => {
                    if (oldTimer) throw new DuplicityError('a timer already created')
                    const timer = {
                        author: userId,
                        time: time,
                        pauseTime: pauseTime,
                        tag: tag,
                    }

                    return Timer.create(timer)
                        .catch(error => { throw new SystemError(error.message) })

                })
        })
        .then(() => { })
}