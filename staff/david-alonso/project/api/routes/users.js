import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

// REGISTRAR USUARIO
users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { name, email, password } = req.body

    return logic.registerUser(name, email, password)
        .then(() => res.status(201).send())
}))

// AUTENTIFICAR USUARIO
users.post('/auth', jsonBodyParser, withErrorHandling((req, res) => {
    const { email, password } = req.body

    return logic.authenticateUser(email, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, JWT_SECRET)

            res.json({ token })
        })
}))

// OBTENER EL NAME DEL USUARIO
users.get('/self/name', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserUsername(userId)
        .then(name => res.json({ name }))
}))
