import { Couple, List } from '../../data/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export const updateList = (userId, listId, title, color) => {
    validate.id(userId, 'userId')
    validate.id(listId, 'listId')
    if (title !== undefined) validate.notBlankString(title, 'title')
    if (color !== undefined) validate.color(color, 'color')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return List.findById(listId)
                .catch(error => { throw new SystemError(error.message) })
                .then(list => {
                    if (!list) throw new NotFoundError('List not found')
                    if (!list.couple.equals(couple._id)) throw new AuthorizationError('Couple is not the owner of the list')

                    if (title !== undefined) list.title = title.trim()
                    if (color !== undefined) list.color = color.trim()
                    list.modifiedAt = new Date()

                    return list.save()
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}
