import { Couple, CalendarEvent } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const createCalendarEvent = (userId, eventDate, title, description) => {
    validate.id(userId, 'userId')
    validate.date(eventDate, 'eventDate')
    validate.notBlankString(title, 'title') //TODO ?
    validate.notBlankString(description, 'description') //TODO ?

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return CalendarEvent.create({
                couple: couple._id,
                author: userId,
                eventDate,
                title: title.trim(),
                description: description.trim()
            }).catch(error => { throw new SystemError(error.message) })
        })
}
