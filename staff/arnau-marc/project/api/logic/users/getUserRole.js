import { User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'
import { Error as MongooseError } from 'mongoose'

const { ValidationError} = MongooseError

const { NotFoundError } = errors

export function getUserRole(userId) {
  validate.id(userId, 'userId')

  return User.findById(userId)
    .then(user => {
      if (!user) throw new NotFoundError('User not found')
        if (!['admin', 'regular'].includes(user.role)) {
          throw new ValidationError("your role is not expected")
        }
      return {
        id: user._id.toString(),
        role: user.role
    }
    })
}