import { User } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors


export const addUserCredit = (userId, amount) => {
    validate.id(userId)
    validate.number(amount)
    validate.minValue(amount, 1)

    return User.findByIdAndUpdate(
        userId,
        { $inc: { credit: amount } },
        { new: true } 
    )
    .then(user => {
    if (!user) throw new NotFoundError('user not found')
    return user.credit
  })
    .catch(error => {
      if (error instanceof NotFoundError) throw error
      throw new SystemError(error.message)
    })
}