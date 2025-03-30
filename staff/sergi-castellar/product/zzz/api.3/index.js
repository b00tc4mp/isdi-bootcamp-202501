import express, { json } from 'express'
import cors from 'cors'
import { errors } from 'com'
import jwt from 'jsonwebtoken'

import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, SystemError, NotFoundError, ValidationError, OwnershipError } = errors

const JWT_SECRET = 'e89633ae5ba1df66df2ba64cd90410ab7f4dcfe49a52067b611d55f24e8913b027a8be88a0c08d16dc82c4ea22135a3a3d47613197eef579e92a9d8b6ee6e48710eed50542c1dda215f499130df4f7aab12831d53c850ca9dabe555e5e75dffc272ea4a4baa58637af2a068ee310d637d30211175181bb4f65d58bf5f2b8f8de'

data.connect('mongodb://localhost:27017', 'test')
    .catch(console.error)
    .then(() => {
        const api = express()
        const port = 8080

        const jsonBodyParser = json()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, API!'))

        api.get('/posts', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.getPosts(userId)
                    .then(posts => res.json(posts))
                    .catch(error => {
                        console.error(error);

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })
            } catch (error) {
                console.error(error);

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.get('/users/user/:userId', jsonBodyParser, (req, res) => {
            try {
                const { userId } = req.params

                logic.getUserById(userId)
                    .then(user => res.json({ user }))
                    .catch(error => {
                        console.error(error);

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })
            } catch (error) {
                console.error(error);

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.post('/users', jsonBodyParser, (req, res) => { //register user
            try {
                const { name, email, username, password } = req.body

                logic.registerUser(name, email, username, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        console.error(error)

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof DuplicityError) {
                            status = 409
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })

            } catch (error) {
                console.error(error)

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => { //authenticate user
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(id => {
                        const token = jwt.sign({ sub: id }, JWT_SECRET)

                        res.json({ token })
                    })
                    .catch(error => {
                        console.error(error)

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        } else if (error instanceof CredentialsError) {
                            status = 401
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })
            } catch (error) {
                console.error(error);

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.get('/users/self', (req, res) => { //get current user
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.getUserById(userId)
                    .then(user => res.json({ user }))
                    .catch(error => {
                        console.error(error);

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })
            } catch (error) {
                console.error(error);

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.post('/posts/new', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { imageSrc, textDescription } = req.body

                logic.createNewPost(userId, imageSrc, textDescription)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        console.error(error);

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })
            } catch (error) {
                console.error(error);

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.delete('/posts/delete/:postId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                logic.deletePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        console.error(error);

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        } else if (error instanceof OwnershipError) {
                            status = 403
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })
            } catch (error) {
                console.error(error);

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.patch('/posts/likes/:postId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                logic.toggleLike(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        console.error(error);

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })
            } catch (error) {
                console.error(error);

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.patch('/posts/edit/:postId', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                const { text } = req.body

                logic.editPost(userId, postId, text)
                    .then(res.status(204).send())
                    .catch(error => {
                        console.error(error);

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        } else if (error instanceof OwnershipError) {
                            status = 403
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                    })
            } catch (error) {
                console.error(error);

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.listen(port, () => console.log(`API running on post ${port}`))
    })