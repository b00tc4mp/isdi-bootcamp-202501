import { User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'
import { Error as MongooseError } from 'mongoose'

const { ValidationError, CastError } = MongooseError


const { NotFoundError, SystemError } = errors

export function getUserRole(userId) {
  validate.id(userId, 'userId')

  return User.findById(userId)
    .then(user => {
      if (!user) throw new NotFoundError('User not found')
        if (!['admin', 'regular'].includes(user.role)) {
          throw new ValidationError("your role is not expected")
        }
      return user.role
    })
 
}