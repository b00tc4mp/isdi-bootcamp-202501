import { Season } from '../../data/index.js'
import { errors } from '../../validations/index.js'

const { SystemError } = errors

export const getFinishedSeasons = () => {
    return Season.find({ status: 'finished' }, { _id: 1, name: 1 }).lean()
    .catch (error => { throw new SystemError(error.message) })
    .then(seasons => seasons || [])
}

export default getFinishedSeasons