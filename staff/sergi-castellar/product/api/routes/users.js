import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

users.get('/self', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserById(userId)
        .then(user => res.json({ user }))
}))

users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { name, email, username, password } = req.body

    return logic.registerUser(name, email, username, password)
        .then(() => res.status(201).send())
}))

users.post('/auth', jsonBodyParser, withErrorHandling((req, res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, JWT_SECRET)

            res.json({ token })
        })
}))

users.get('/:userId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req.params

    return logic.getUserById(userId)
        .then(user => res.json({ user }))
}))

users.get('/:targetUserId/posts', authHandler, withErrorHandling((req, res) => {
    const { userId, params: { targetUserId } } = req

    return logic.getUserPosts(userId, targetUserId)
        .then(posts => res.json(posts))
}))