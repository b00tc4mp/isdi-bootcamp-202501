import { Router } from 'express'

import { jsonBodyParser, authHandler, withErrorHandling } from '../handlers/index.js'

import { logic } from '../logic/index.js'

export const orders = Router()

orders.post('/', jsonBodyParser, authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { menuId, bread, note } = req.body

    return logic.createOrder(userId, menuId, bread, note)
        .then(() => res.status(201).send())
}))

orders.get('/:userId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req.params

    return logic.getOrdersByUser(userId)
        .then(orders => res.json(orders))
}))

orders.delete('/:orderId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { orderId } = req.params

    return logic.deleteOrder(userId, orderId)
        .then(() => res.status(204).send())
}))