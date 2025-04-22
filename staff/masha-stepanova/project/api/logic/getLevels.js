import { User, Level } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getLevels = (userId) => {
  validate.id(userId, 'userId')

  return Promise.all([User.findById(userId).lean(), Level.find().select('-__v').sort('ordinal').lean()])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, levels]) => {
      if (!user) throw new NotFoundError('user not found')

      levels.forEach((level, i) => {
        level.id = level._id.toString()
        delete level._id

        level.isBlocked = i === 0 ? false : true

        if (user.generalProgress.length)
          user.generalProgress.forEach((levelObjectId) => {
            if (levelObjectId.toString() === level.id || user.currentLevel.toString() === level.id) level.isBlocked = false
          })
      })

      return levels
    })
}
