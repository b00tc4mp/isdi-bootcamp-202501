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

users.get('/self/username', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserUserName(userId)
        .then(username => res.json({ username }))
}))

users.get('/:targetUserId/posts', authHandler, withErrorHandling((req, res) => {
    const { userId, params: { targetUserId } } = req

    return logic.getUserPosts(userId, targetUserId)
        .then(posts => res.json(posts))
}))
