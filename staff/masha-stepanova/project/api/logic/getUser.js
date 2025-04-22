import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getUser = (userId) => {
  validate.id(userId, 'userId')

  return User.findById(userId)
    .select('-__v')
    .lean()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError('user not found')

      user.id = user._id.toString()
      delete user._id

      return user
    })
}
