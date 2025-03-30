import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'
import { errors } from 'com'
import jwt from 'jsonwebtoken'

import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors

const { JWT_SECRET, PORT, MONGO_URL, MONGO_DB } = process.env 

const withErrorHandling = callback => { //
    return (req, res, next) => {
        try {
            callback(req, res)
                .catch(error => next(error))
        } catch (error) {
            next(error)
        }
    }
}

data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error)
    .then(() => {
        const api = express() // inicializamos la aplicación, creamos una instancia de la aplicación para manejar rutas, peticiones y respuestas
            
        const jsonBodyParser = json()

        api.use(cors())
        
        api.get('/hello', (req, res) => {
            console.log(req.path)
        
            res.send('Hello, World!')
        })
        
        api.post('/users', jsonBodyParser, withErrorHandling((req, res) => {
            const { name, email, username, password } = req.body
        
            return logic.registerUser(name, email, username, password)
                .then(() => res.status(201).send())
        }))
        
        api.post('/users/auth', jsonBodyParser, withErrorHandling((req, res) => {
            const { username, password } = req.body
        
            return logic.authenticateUser(username, password)
                .then(id => {
                    const token = jwt.sign({ sub: id }, JWT_SECRET)
                        res.json({ token })
                })
        }))
        
        api.post('/posts', jsonBodyParser, withErrorHandling((req, res) => {
            const { authorization } = req.headers
        
            const token = authorization.slice(7)
        
            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { image, text } = req.body
        
            return logic.createPost(userId, image, text)
                .then(() => res.status(201).send())
        }))
        
        api.delete('/posts/:postId', withErrorHandling((req, res) => {
            const { authorization } = req.headers
        
            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)
        
            const { postId } = req.params
        
            return logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
        }))
        
        api.get('/posts', withErrorHandling((req, res) => {
            const { authorization } = req.headers
        
            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)
        
            return logic.getPosts(userId)
                .then(posts => res.json(posts))
        }))
        
        api.patch('/posts/:postId/likes', withErrorHandling((req, res) => {
            const { authorization } = req.headers
        
            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)
        
            const { postId } = req.params
        
            return logic.toggleLikePost(userId, postId) 
                .then(() => res.status(204).send())
        }))
        
        api.get('/posts', withErrorHandling((req, res) => {
            const { authorization } = req.headers
        
            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)
        
            return logic.getPosts(userId) 
                .then(posts => res.json(posts))
        }))
        
        api.get('/users/self/name', withErrorHandling((req, res) => {
                const { authorization } = req.headers
        
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
        
                return logic.getUserName(userId)
                    .then(name => res.json({ name }))
        }))
        
        api.patch('/posts/:postId/text', jsonBodyParser, withErrorHandling((req, res) => {
                const { authorization } =req.headers
        
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
        
                const { postId } = req.params
        
                const { text } = req.body
        
                return logic.updatePostText(userId, postId, text)
                    .then(() => res.status(204).send())
        }))

        const errorHandler = (error, _req, res, _next) => {
            console.error(error)

            let status = 500
            let errorName = SystemError.name

            if (error instanceof DuplicityError) {
                status = 409
                errorName = error.constructor.name
            } else if (error instanceof ValidationError) {
                status = 400
                errorName = error.constructor.name
            } else if (error instanceof CredentialsError) {
                status = 401
                errorName = error.constructor.name
            } else if (error instanceof NotFoundError) {
                status = 404
                errorName = error.constructor.name
            } else if (error instanceof OwnershipError) {
                status = 403
                errorName = error.constructor.name
            }

            res.status(status).json({ error: errorName, message: error.message })
        }

        api.use(errorHandler)
        
        api.listen(PORT, () => console.log(`API running on port ${PORT}`)) // arrancamos el servidor
    })