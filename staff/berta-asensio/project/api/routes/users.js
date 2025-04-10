import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

//Ruta para registrar un nuevo usuario
users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { name, email, password } = req.body

    return logic.registerUser(name, email, password)
        .then(() => res.status(201).send())
}))

//Ruta para autenticar un usuario
users.post('/auth', jsonBodyParser, withErrorHandling((req, res) => {
    const { email, password } = req.body

    return logic.authenticateUser(email, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, JWT_SECRET, {expiresIn: '3h'})
            res.json({ token })
        })
}))