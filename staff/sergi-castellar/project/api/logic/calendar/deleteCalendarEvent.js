import { Couple, CalendarEvent } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export const deleteCalendarEvent = (userId, eventId) => {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return CalendarEvent.findById(eventId)
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('Event not found')
                    if (!event.couple.equals(couple._id)) throw new AuthorizationError('Couple is not the owner of the event')

                    return event.deleteOne()
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}
