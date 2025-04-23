import { Couple, List, ListItem } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export const createItem = (userId, listId, text) => {
    validate.id(userId, 'userId')
    validate.id(listId, 'listId')
    validate.textListItem(text, 'text')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return List.findById(listId)
                .catch(error => { throw new SystemError(error.message) })
                .then(list => {
                    if (!list) throw new NotFoundError('List not found')
                    if (!list.couple.equals(couple._id)) throw new AuthorizationError('Couple is not the owner of the list')

                    return ListItem.create({ text: text.trim(), list: list._id })
                        .then(item => {
                            list.items.push(item._id)
                            return list.save()
                                .catch(error => { throw new SystemError(error.message) })

                        })
                        .then(() => { })
                })
        })
}
