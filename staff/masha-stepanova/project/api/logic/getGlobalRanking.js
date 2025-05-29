import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getGlobalRanking = (userId) => {
  validate.id(userId)

  return Promise.all([User.find().select('score username').lean(), User.findOne({ _id: userId }).lean()])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([allUsers, currentUser]) => {
      if (!currentUser) throw new NotFoundError('user not found')

      allUsers.sort((a, b) => b.score - a.score)

      allUsers.forEach((user, i) => (user.position = i + 1))

      return allUsers
    })
}
