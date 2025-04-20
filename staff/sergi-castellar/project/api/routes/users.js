import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, retrieveUserId } from '../middleware/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

users.get('/', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getSelfUser(userId)
        .then(user => res.json({ user }))
}))

users.get('/couple-status', retrieveUserId, withErrorHandling((req, res) => {
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

users.delete('/', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.deleteUser(userId)
        .then(() => res.status(204).send())
}))

// users.patch('/', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
//     const { userId } = req

//     return logic.editUser(userId)
//         .then(() => res.status(204).send())
// }))