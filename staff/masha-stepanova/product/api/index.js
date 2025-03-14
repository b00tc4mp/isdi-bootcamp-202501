import express, { json } from 'express'

import { logic } from './logic/index.js'
import { CredentialsError, DuplicityError, NotFoundError, SystemError, OwnershipError, ValidationError } from './errors.js'

const api = express()

const jsonBodyParse = json()

const port = 8080

// api.use(cors())

api.get('/', (req, res) => {
    res.send('Hello, API!')
})

api.post('/users', jsonBodyParse, (req, res) => {
    try {
        const { name, email, username, password } = req.body

        logic.registerUser(name, email, username, password)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof DuplicityError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }

    console.log(req)
})

api.post('/users/auth', jsonBodyParse, (req, res) => {
    try {
        const { username, password } = req.body

        const id = logic.authenticateUser(username, password)

        res.json(id)
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof CredentialsError) {
            status = 401
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        } else if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.post('/posts/create', jsonBodyParse, (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { body: { link, text } } = req

        logic.createPost(userId, link, text)

        res.status(201).send()
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

api.get('/posts', (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const posts = logic.getPosts(userId)

        res.send(posts)
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

api.get('/posts/self/posts', (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const posts = logic.getUserPosts(userId)

        res.send(posts)
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

api.get('/users/self/name', (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const name = logic.getUserName(userId)

        res.json(name)
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        } else if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.delete('/posts/:postId', (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { postId } = req.params

        logic.deletePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof OwnershipError) {
            status = 403
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

// TODO eliminate ownership error

api.patch('/posts/:postId/likes', jsonBodyParse, (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { postId } = req.params

        logic.toggleLikePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.patch('/posts/:postId/text', jsonBodyParse, (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { params: { postId }, body: { text } } = req

        logic.updatePostText(userId, postId, text)

        res.status(204).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof OwnershipError) {
            status = 403
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.listen(port, () => {
    console.log('Test listening port ' + port)
})