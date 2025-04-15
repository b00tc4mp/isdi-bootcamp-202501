import { User, Season } from '../../data/index.js'
import { validate, errors } from '../../validations/index.js'

const { AuthorizationError, SystemError, DuplicityError } = errors

export const createSeason = (userId, { name, startDate, endDate }) => {
  validate.id(userId, 'userId')
 
  
  return User.findById(userId).lean()
    .catch(err => { throw new SystemError(err.message) })
    .then(user => {
      if (!user || user.role !== 'admin') throw new AuthorizationError('Only admins can create a season')
    })
    .then(() => Season.findOne({ status: 'active' }))
    .then(existing => {
      if (existing) throw new DuplicityError('There is already an active season')
    })
    .then(() => Season.create({
      name: name.toLowerCase(),
      startDate,
      endDate,
      status: 'active',
      participants: []
    }))
}
