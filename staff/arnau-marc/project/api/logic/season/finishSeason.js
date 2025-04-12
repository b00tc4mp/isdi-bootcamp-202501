import { User, Season } from '../../data/index.js'
import { errors } from 'com'

const { SystemError, NotAllowedError, NotFoundError } = errors

export const finishSeason = (userId, seasonId) => {
  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('User not found')
      if (user.role !== 'admin') throw new NotAllowedError('Only admins can finish a season')

      return Season.findById(seasonId)
    })
    .then(season => {
      if (!season) throw new NotFoundError('Season not found')

      season.status = 'finished'
      return season.save()
    })
}