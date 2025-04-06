import jwt from 'jsonwebtoken'
import { Router } from 'express'

import {authHandler, withErrorHandling, jsonBodyParser} from '../handlers/index.js'

import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

//se ejecuta el metodo post cuando tiramos -> curl -X POST -d '{"name":"aaron", "age": "26"}' -H 'Content-Type: 'application/json' - v http://localhost:8080

// request body -> '{"name":"aaron", "age": "26"}'


//  ----- REGISTER METHOD -----
users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    //1. el jsonParse va a coger el objeto request y lo va a parsear
    //2. después se pasa a la req de al lado:(req), que la va a recibir ya parseada
    //3. una vez recibida, como está en js ya podemos desestructurarlo -> linea 57

    const { name, email, username, password } = req.body

    return logic.registerUser(name, email, username, password)
        .then(() => res.status(201).send())
}))


//  ----- AUTHENTICATE-USER METHOD -----
users.post('/auth', jsonBodyParser, withErrorHandling((req, res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '1h' })

            res.json({ token })
        })
}))


//  ----- GET USERNAME METHOD -----
users.get('/self/username', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserUsername(userId)
        .then(username => res.json({ username }))
}))

//  ----- GET USERPOSTS METHOD -----
users.get('/:targetUserId/posts', authHandler, withErrorHandling((req, res) => {
    const { userId, params: { targetUserId }} = req

    return logic.getUserPosts(userId, targetUserId)
        .then(posts => res.json(posts))
}))


