import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { logic } from '../logic/index.js'
import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { name, username, password, email } = req.body

    return logic.registerUser(name, username, password, email)
        .then(() => res.status(201).send())
}))

users.post('/auth', jsonBodyParser, withErrorHandling((req, res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '1h' })
            res.json({ token })
        })
}))

users.get('/self/name', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserName(userId)
        .then(name => res.json({ name }))
}))
