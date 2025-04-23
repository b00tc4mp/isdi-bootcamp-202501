import { Couple, List, ListItem } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export const deleteItem = (userId, itemId) => {
    validate.id(userId, 'userId')
    validate.id(itemId, 'itemId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return ListItem.findById(itemId)
                .then(item => {
                    if (!item) throw new NotFoundError('Item not found')

                    return List.findById(item.list)
                        .then(list => {
                            if (!list) throw new NotFoundError('List not found')
                            if (!list.couple.equals(couple._id)) throw new AuthorizationError('Couple is not the owner of the list')

                            list.items.pull(item._id)

                            return Promise.all([
                                list.save(),
                                item.deleteOne()
                            ])
                        })
                })
        })
}
