import { User, Level } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getLevel = (userId, levelId) => {
  validate.id(userId, 'userId')
  validate.id(levelId, 'levelId')

  return Promise.all([User.findById(userId).lean(), Level.findById(levelId).select('-__v').lean()])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, level]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!level) throw new NotFoundError('level not found')

      return level
    })
}
