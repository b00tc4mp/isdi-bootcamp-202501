import { Couple, CalendarEvent } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export const updateCalendarEvent = (userId, eventId, title, description) => {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')
    if (title !== undefined) validate.notBlankString(title, 'title')
    if (description !== undefined) validate.notBlankString(description, 'description')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return CalendarEvent.findById(eventId)
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('Event not found')
                    if (!event.couple.equals(couple._id)) throw new AuthorizationError('Couple is not the owner of the event')

                    if (title !== undefined) event.title = title.trim()
                    if (description !== undefined) event.description = description.trim()
                    event.modifiedAt = new Date()

                    return event.save().catch(error => { throw new SystemError(error.message) })
                })
        })
}
