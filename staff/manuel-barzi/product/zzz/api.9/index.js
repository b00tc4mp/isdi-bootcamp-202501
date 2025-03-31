import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'
import { errors } from 'com'
import jwt from 'jsonwebtoken'

import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError, AuthorizationError } = errors
const { JsonWebTokenError, TokenExpiredError } = jwt

const { JWT_SECRET, PORT, MONGO_URL, MONGO_DB } = process.env

const withErrorHandling = callback => {
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
        const api = express()

        const jsonBodyParser = json()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, API!'))

        api.post('/users', jsonBodyParser, withErrorHandling((req, res) => {
            const { name, email, username, password } = req.body

            return logic.registerUser(name, email, username, password)
                .then(() => res.status(201).send())
        }))

        api.post('/users/auth', jsonBodyParser, withErrorHandling((req, res) => {
            const { username, password } = req.body

            return logic.authenticateUser(username, password)
                .then(id => {
                    const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '1h' })

                    res.json({ token })
                })
        }))

        const authHandler = (req, res, next) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                req.userId = userId

                next()
            } catch (error) {
                next(error)
            }
        }

        api.get('/users/self/name', authHandler, withErrorHandling((req, res) => {
            const { userId } = req

            return logic.getUserName(userId)
                .then(name => res.json({ name }))
        }))

        api.post('/posts', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
            const { userId } = req

            const { image, text } = req.body

            return logic.createPost(userId, image, text)
                .then(() => res.status(201).send())
        }))

        api.get('/posts', authHandler, withErrorHandling((req, res) => {
            const { userId } = req

            return logic.getPosts(userId)
                .then(posts => res.json(posts))
        }))

        api.delete('/posts/:postId', authHandler, withErrorHandling((req, res) => {
            const { userId } = req

            const { postId } = req.params

            return logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        api.patch('/posts/:postId/likes', authHandler, withErrorHandling((req, res) => {
            const { userId } = req

            const { postId } = req.params

            return logic.toggleLikePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        api.patch('/posts/:postId/text', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
            const { userId } = req

            const { postId } = req.params

            const { text } = req.body

            return logic.updatePostText(userId, postId, text)
                .then(() => res.status(204).send())
        }))

        const errorHandler = (error, req, res, next) => {
            console.error(error)

            let status = 500
            let errorName = SystemError.name
            let { message } = error

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
            } else if (error instanceof TokenExpiredError) {
                status = 401
                errorName = AuthorizationError.name
                message = 'expired JWT'
            } else if (error instanceof JsonWebTokenError) {
                status = 401
                errorName = AuthorizationError.name
                message = 'invalid JWT'
            }

            res.status(status).json({ error: errorName, message })
        }

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on post ${PORT}`))
    })