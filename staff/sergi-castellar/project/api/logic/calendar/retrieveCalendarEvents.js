import { Couple, CalendarEvent } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const retrieveCalendarEvents = (userId, startDate, endDate) => {
    validate.id(userId, 'userId')
    validate.date(startDate, 'startDate')
    validate.date(endDate, 'endDate')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return CalendarEvent.find({
                couple: couple._id,
                eventDate: { $gte: startDate, $lte: endDate }
            }).sort({ eventDate: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(events => {
            return events.map(event => ({
                id: event._id.toString(),
                author: event.author.toString(),
                title: event.title,
                description: event.description,
                eventDate: event.eventDate
            }))
        })
}
