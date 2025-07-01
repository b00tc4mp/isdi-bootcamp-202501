import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { name, email, username, password } = req.body

    return logic.registerUser(name, email, username, password)
        .then(() => res.status(201).send()) //HAPPY. Como es asincrono, hay que poner la res.status una vez devuelva el register. No devuelve nada a nivel de datos.
}))

users.post('/auth', jsonBodyParser, withErrorHandling((req, res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '1h' }) //Se envian los datos, sub (subject) es un estandar. Nos devuelve el token que expira en 1 hs.

            res.json({ token }) //Devolvemos el token
        })
}))

users.get('/self/username', authHandler, withErrorHandling((req, res) => { //cuando ponemos authHandler antes que withErrorHandling significa que en la ruta /self/name pasa primero por auth y si todo va bien pasa a withErrorHandling
    const { userId } = req //destructuro el userId que me traigo de authHandler

    return logic.getUserUsername(userId)
        .then(username => { res.json({ username }) }) //hay que retornarlo en forma de JSON
}))

users.get('/:targetUserId/posts', authHandler, withErrorHandling((req, res) => {
    const { userId, params: { targetUserId } } = req

    return logic.getUserPosts(userId, targetUserId)
        .then(posts => res.json(posts))
}))