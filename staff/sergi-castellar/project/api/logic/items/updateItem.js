import { Couple, List, ListItem } from '../../data/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export const updateItem = (userId, itemId, text) => {
    validate.id(userId, 'userId')
    validate.id(itemId, 'itemId')
    validate.textListItem(text, 'text')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return ListItem.findById(itemId)
                .catch(error => { throw new SystemError(error.message) })
                .then(item => {
                    if (!item) throw new NotFoundError('Item not found')

                    return List.findById(item.list).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(list => {
                            if (!list) throw new NotFoundError('List not found')
                            if (!list.couple.equals(couple._id)) throw new AuthorizationError('Couple is not the owner of the list')

                            item.text = text.trim()
                            item.modifiedAt = new Date()

                            return item.save()
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
        })
}
