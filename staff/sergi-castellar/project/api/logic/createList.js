import { Couple, List } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const createList = (userId, title, color) => {
    validate.id(userId, 'userId')
    validate.notBlankString(title, 'title')
    validate.notBlankString(color, 'color')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('couple not found')

            return List.create({
                title: title.trim(),
                color,
                couple: couple._id,
                author: userId,
                items: []
            })
                .catch(error => { throw new SystemError(error.message) })
        })
}
