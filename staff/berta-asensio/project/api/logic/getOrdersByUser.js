import { Order } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getOrdersByUser = userId => {
    validate.id(userId)

    return Order.find({ user: userId }).populate('menu').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(orders => {
            if (!orders || orders.length === 0)
                throw new NotFoundError('this user has no orders')

            const now = new Date()

            const deliveryUpdate = orders
                .filter(order => order.status === 'pendiente' && order.deliveryDate < now)
                .map(order => {
                    return Order.findByIdAndUpdate(order._id, { status: 'entregado' })
                        .catch(console.error)
                        .then (() => {
                            order.status = 'entregado'
                        })
                })

            return Promise.all(deliveryUpdate)
                .then(() => {
                    return orders.map(order => {
                        order.id = order._id.toString()
                        delete order._id

                        if (order.menu && order.menu._id) {
                            order.menu.id = order.menu._id.toString()
                            delete order.menu._id
                        }

                        return order
                    })
                })
    })

}
