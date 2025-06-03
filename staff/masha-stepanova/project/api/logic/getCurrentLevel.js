import { User, Level } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getCurrentLevel = (userId) => {
  validate.id(userId, 'userId')

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError('user not found')

      if (user.currentLevel) {
        return Level.findById(user.currentLevel.toString())
          .select('-__v')
          .lean()
          .catch((error) => {
            throw new SystemError(error.message)
          })
          .then((level) => {
            level.id = level._id.toString()

            delete level._id

            return level
          })
      } else {
        return Level.find()
          .select('-__v')
          .lean()
          .catch((error) => {
            throw new SystemError(error.message)
          })
          .then((levels) => {
            let level = levels[0]

            level.id = level._id.toString()

            delete level._id

            return level
          })
      }
    })
}
