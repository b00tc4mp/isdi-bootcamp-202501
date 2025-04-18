import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

users.get('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getSelfUser(userId)
        .then(user => res.json({ user }))
}))

users.get('/couple-status', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getIfUserIsInCouple(userId)
        .then(status => res.json({ status }))
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
            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '188d' })

            res.json({ token })
        })
}))

users.delete('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.deleteUser(userId)
        .then(() => res.status(204).send())
}))

users.patch('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.editUser(userId)
        .then(() => res.status(204).send())
}))