import express, { json } from 'express'
import cors from 'cors'

import { logic } from './logic/index.js'

import { CredentialsError, DuplicityError, NotFoundError, SystemError, ValidationError, OwnershipError } from './errors.js'
import { authenticateUser } from './logic/authenticateUser.js'

const api = express()

const PORT = 8080

const jsonBodyParser = json()

api.use(cors())

api.get('/', (req, res) => {
    console.log(req.path)

    res.send('Hello API!')
})

api.post('/users', jsonBodyParser, (req, res) => {
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

api.get('/posts', (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const posts = logic.getPosts(userId)

        res.json(posts)
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

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        const id = authenticateUser(username, password)

        res.json({ id })
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
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.get('/users/self/name', (req, res) => {
    try {
        const { authorization } = req.headers //Para acceder a la cabecera del curl -H 'Authorization...'

        const userId = authorization.slice(6) //Extraigo el valor de la autorization del curl con slice cortando desde ese indice hasta el final, lo que esta despues de Basic

        const name = logic.getUserName(userId)

        res.json({ name }) //hay que retornarlo en forma de JSON
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { image, text } = req.body

        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.error
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.delete('/posts/:postId', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { postId } = req.params

        logic.deletePost(userId, postId)

        res.status(204) //204 ha ido todo bien y no hay body que responder, no hay contenido de respuesta.
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
        } else if (error instanceof OwnershipError) {
            status = 403
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.patch('/posts/:postId/likes', (req, res) => {
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

api.patch('/posts/:postId/text', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { postId } = req.params

        const { text } = req.body

        logic.updatePostText(userId, postId, text)

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
        } else if (error instanceof OwnershipError) {
            status = 403
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.listen(PORT, () => console.log(`API running on port ${PORT}`))