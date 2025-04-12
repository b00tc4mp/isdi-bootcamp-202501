import { User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { NotFoundError } = errors

export function getUserRole(userId) {
  validate.id(userId, 'userId')

  return User.findById(userId)
    .then(user => {
      if (!user) throw new NotFoundError('User not found')

      return user.role
    })
}