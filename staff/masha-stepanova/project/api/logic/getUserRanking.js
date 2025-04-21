import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getUserRanking = (userId) => {
  validate.id(userId)

  return Promise.all([User.find().select('score username').lean(), User.findOne({ _id: userId }).lean()])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([allUsers, currentUser]) => {
      if (!currentUser) throw new NotFoundError('user not found')

      allUsers.sort((a, b) => b.score - a.score)

      let index = allUsers.findIndex((user) => user._id.toString() === userId)

      let position

      if (index > -1) {
        position = index + 1
      } else throw new NotFoundError('user not found in global ranking')

      const userRanking = {
        username: currentUser.username,
        position,
        score: currentUser.score,
      }

      return userRanking
    })
}
