import { SystemError } from 'com/errors.js'
import { User, Timer } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getTimers = userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Timer.find({ author: userId }).select('-__v').sort('-createdAt').lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, timers]) => {
            if (!user) throw new NotFoundError('user not found')

            timers.forEach(timer => {
                timer.id = timer._id.toString()
                delete timer._id

                if (timer.author) {
                    timer.author = timer.author.toString()
                }

            })

            return timers
        })
}