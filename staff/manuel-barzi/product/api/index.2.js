import express, { json } from 'express'
import cors from 'cors'
import { errors } from 'com'
import jwt from 'jsonwebtoken'

import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors

const JWT_SECRET = 'mi numero favorito es el 17'

const handleWithErrorHandling = (next, callback) => {
    try {
        callback()
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}

data.connect('mongodb://localhost:27017', 'test')
    .catch(console.error)
    .then(() => {
        const api = express()

        const jsonBodyParser = json()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, API!'))

        api.post('/users', jsonBodyParser, (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { name, email, username, password } = req.body

                return logic.registerUser(name, email, username, password)
                    .then(() => res.status(201).send())
            })
        })

        api.post('/users/auth', jsonBodyParser, (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { username, password } = req.body

                return logic.authenticateUser(username, password)
                    .then(id => {
                        const token = jwt.sign({ sub: id }, JWT_SECRET)

                        res.json({ token })
                    })
            })
        })

        api.get('/users/self/name', (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.getUserName(userId)
                    .then(name => res.json({ name }))
            })
        })

        api.post('/posts', jsonBodyParser, (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { image, text } = req.body

                return logic.createPost(userId, image, text)
                    .then(() => res.status(201).send())
            })
        })

        api.get('/posts', (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.getPosts(userId)
                    .then(posts => res.json(posts))
            })
        })

        api.delete('/posts/:postId', (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                return logic.deletePost(userId, postId)
                    .then(() => res.status(204).send())
            })
        })

        api.patch('/posts/:postId/likes', (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                return logic.toggleLikePost(userId, postId)
                    .then(() => res.status(204).send())
            })
        })

        api.patch('/posts/:postId/text', jsonBodyParser, (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                const { text } = req.body

                return logic.updatePostText(userId, postId, text)
                    .then(() => res.status(204).send())
            })
        })

        const errorHandler = (error, req, res, next) => {
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

        api.listen(8080, () => console.log('API running on post 8080'))
    })