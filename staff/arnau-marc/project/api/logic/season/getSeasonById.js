import { Season } from '../../data'
import { errors } from '../../validations/index.js'

const { SystemError, NotFoundError } = errors

export const getSeasonById = (seasonId) => {
  return Season.findById(seasonId).lean()
    .catch(err => { throw new SystemError(err.message) })
    .then(season => {
      if (!season) throw new NotFoundError('Season not found')
      return season
    })
}
