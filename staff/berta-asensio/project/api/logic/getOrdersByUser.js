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

            orders.forEach(order => {
                if (order.status === 'pendiente' && order.deliveryDate < now) {

                    Order.findByIdAndUpdate(order._id, { status: 'entregado' })
                        .catch(console.error)

                    order.status = 'entregado'
                }
            })

            return orders
        })
}
