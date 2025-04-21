import { List, ListItem, Couple } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export const retrieveItems = (userId, listId) => {
    validate.id(userId, 'userId')
    validate.id(listId, 'listId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return List.findById(listId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(list => {
                    if (!list) throw new NotFoundError('List not found')
                    if (!list.couple.equals(couple._id)) throw new AuthorizationError('Couple is not the owner of the list')

                    return ListItem.find({ _id: { $in: list.items } }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}
