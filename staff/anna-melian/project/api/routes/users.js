import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

users.post('/auth', jsonBodyParser, withErrorHandling((req, res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '24h' })

            res.json({ token })
        })
}))

users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { name, email, username, password } = req.body

    return logic.registerUser(name, email, username, password)
        .then(() => res.status(201).send())
}))

users.get('/self/gems', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserGems(userId)
        .then(gems => res.json({ gems }))
}))

users.get('/self/timer-check', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.checkUserTimers(userId)
        .then((TimerOnId) => {
            if (!TimerOnId) return res.sendStatus(204)

            res.status(200).json({ id: TimerOnId })
        }
        )
}))