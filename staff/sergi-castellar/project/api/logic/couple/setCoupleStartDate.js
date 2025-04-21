import { Couple } from '../../data/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export const setCoupleStartDate = (userId, dateStart) => {
    validate.id(userId, 'userId')
    validate.date(dateStart, 'dateStart')

    return Couple.findOne({ members: userId })
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            couple.dateStart = dateStart
            couple.modifiedAt = new Date()

            return couple.save()
        })
}
