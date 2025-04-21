import { Couple, CalendarEvent } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const retrieveCoupleEvents = (userId, startDate, endDate) => {
    validate.id(userId, 'userId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return CalendarEvent.find({
                couple: couple._id,
                eventDate: { $gte: startDate, $lte: endDate }
            }).sort({ eventDate: 1 })
                .catch(error => { throw new SystemError(error.message) })
        })
}
