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

      return Level.findById(user.currentLevel.toString())
        .select('-__v')
        .lean()
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then((level) => level)
    })
}
