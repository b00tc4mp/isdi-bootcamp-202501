import { User, Order, Menu } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export const deleteOrder = (userId, orderId) => {
    validate.id(userId)
    validate.id(orderId)

    return Promise.all([
        User.findById(userId).lean(),
        Order.findById(orderId).lean()
    ])
        .catch(error => { throw new SystemError (error.message) })
        .then(([user, order]) => {
            if(!user) throw new NotFoundError('user not found')
            if(!order) throw new NotFoundError('order not found')

            if(order.user.toString() !== userId) throw new OwnershipError('user is not owner of order')

            return Menu.findById(order.menu).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(menu => {
                    if(!menu) throw new NotFoundError('menu not found')
                    
                    return User.findByIdAndUpdate(
                        userId,
                        { $inc: { credit: menu.price } },
                        { new: true }
                    )
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => {
                        return Order.deleteOne({ _id: orderId })
                        .catch(error => { throw new SystemError(error.message) })
                    })
                })
        })
        .then(() => { })
}