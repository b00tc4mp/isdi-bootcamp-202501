import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

users.get('/self', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getSelfUser(userId)
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
            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '188d' })

            res.json({ token })
        })
}))

users.delete('/self', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.deleteUser(userId)
        .then(() => res.status(204).send())
}))

users.patch('/self', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.editUser(userId)
        .then(() => res.status(204).send())
}))


/*

GET / users / self // Obtener los detalles del usuario autenticado.

GET / users /: userId // Obtener un usuario específico por su userId. cambiarlo por partner como self??? couples/self/partner O users/partner???

GET / users / self / feelings // Obtener los feelings del usuario autenticado.

DELETE / users /: userId // Eliminar un usuario específico por su userId.

PATCH / users /: userId // Modificar los detalles de un usuario específico por su userId.
*/