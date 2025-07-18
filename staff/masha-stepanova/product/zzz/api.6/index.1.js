import express, { json } from 'express'
import cors from 'cors'
import { errors } from 'com'
import jwt from 'jsonwebtoken'

import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, SystemError, OwnershipError, ValidationError } = errors

const JWT_SECRET = 'psijfdvbwpiufveivlkjmhgfdsdfghnjmklkjhgfdfgbhnjmkkvdcx'

const respondWithError = (res, error) => {
    let status = 500
    let errorName = SystemError.name

    if (error instanceof DuplicityError) {
        status = 400
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

const handleWithErrorHandling = (res, callback) => {
    try {
        callback()
            .catch(error => {
                console.error(error)

                respondWithError(res, error)
            })
    } catch (error) {
        console.error(error)

        respondWithError(res, error)
    }
}

data.connect('mongodb://localhost:27017', 'test')
    .catch(console.error)
    .then(() => {
        const api = express()

        const jsonBodyParse = json()

        const port = 8080

        api.use(cors())

        api.get('/', (req, res) => {
            res.send('Hello, API!')
        })

        api.post('/users', jsonBodyParse, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { name, email, username, password } = req.body

                return logic.registerUser(name, email, username, password)
                    .then(() => res.status(201).send())
            })

        })

        api.post('/users/auth', jsonBodyParse, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { username, password } = req.body

                return logic.authenticateUser(username, password)
                    .then(id => {
                        const token = jwt.sign({ sub: id }, JWT_SECRET)

                        res.json({ token })
                    })
            })

        })

        api.post('/posts', jsonBodyParse, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { body: { image, text } } = req

                return logic.createPost(userId, image, text)
                    .then(() => res.status(201).send())
            })
        })

        api.get('/posts', (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.getPosts(userId)
                    .then(posts => res.send(posts))
            })
        })

        api.get('/posts/self/posts', (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.getUserPosts(userId)
                    .then(posts => res.json(posts))
            })
        })

        api.get('/users/self/name', (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.getUserName(userId)
                    .then(name => res.json({ name }))
            })
        })

        api.delete('/posts/:postId', (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                return logic.deletePost(userId, postId)
                    .then(() => res.status(204).send())
            })
        })

        api.patch('/posts/:postId/likes', jsonBodyParse, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                return logic.toggleLikePost(userId, postId)
                    .then(() => res.status(204).send())
            })
        })

        api.patch('/posts/:postId/text', jsonBodyParse, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                const { text } = req.body

                return logic.updatePostText(userId, postId, text)
                    .then(() => res.status(204).send())
            })
        })

        api.listen(port, () => {
            console.log('Test listening port ' + port)
        })
    })

