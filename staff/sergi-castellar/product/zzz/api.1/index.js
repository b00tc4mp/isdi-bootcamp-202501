import express, { json } from 'express'
// import bb from 'express-busboy'
import cors from 'cors'

import { DuplicityError, SystemError, NotFoundError, ValidationError, OwnershipError } from './errors.js'

import { logic } from './logic/index.js'

const api = express()
const port = 8080

const jsonBodyParser = json()

api.use(cors())

api.get('/posts', (req, res) => {
    try {
        const { authorization } = req.headers
        const userId = authorization.slice(6)

        const posts = logic.getPosts(userId)

        res.json(posts)
    } catch (error) {
        console.error(error);

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

api.post('/users', jsonBodyParser, (req, res) => { //register user
    try {
        const { name, email, username, password } = req.body

        logic.registerUser(name, email, username, password)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof DuplicityError) {
            status = 409
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.post('/users/auth', jsonBodyParser, (req, res) => { //authenticate user
    try {
        const { username, password } = req.body

        const id = logic.authenticateUser(username, password)

        res.json({ id })
    } catch (error) {
        console.error(error);

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        } else if (error instanceof CredentialsError) {
            status = 401
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.get('/users/self', (req, res) => { //get current user
    try {
        const { authorization } = req.headers
        const userId = authorization.slice(6)

        const user = logic.getCurrentUser(userId)

        res.json(user)
    } catch (error) {
        console.error(error);

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

api.post('/posts/new', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers
        const userId = authorization.slice(6)

        const { imageSrc, textDescription } = req.body

        logic.createNewPost(userId, imageSrc, textDescription)

        res.status(201).send()
    } catch (error) {
        console.error(error);

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

api.delete('/posts/delete/:postId', (req, res) => {
    try {
        const { authorization } = req.headers
        const userId = authorization.slice(6)

        const { postId } = req.params

        logic.deletePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        console.error(error);

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
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
})

api.patch('/posts/likes/:postId', (req, res) => {
    try {
        const { authorization } = req.headers
        const userId = authorization.slice(6)

        const { postId } = req.params

        logic.toggleLike(userId, postId)

        res.status(204).send()
    } catch (error) {
        console.error(error);

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

api.patch('/posts/edit/:postId', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers
        const userId = authorization.slice(6)

        const { postId } = req.params

        const { text } = req.body

        logic.editPost(userId, postId, text)

        res.status(204).send()
    } catch (error) {
        console.error(error);

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
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
})

api.listen(port, () => console.log(`API running on post ${port}`))