import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const couples = Router()

couples.get('/self', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getOwnCouple(userId)
        .then(couple => res.json({ couple }))
}))

couples.get('/self/info', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getCoupleInfo(userId)
        .then(user => res.json({ user }))
}))

couples.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    // const { userId1, userId2 } = req.body

    return logic.createCouple(userId1, userId2)
        .then(() => res.status(201).send())
}))