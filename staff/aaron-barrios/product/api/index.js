import express, { json } from 'express'
import cors from 'cors'

import { logic } from './logic/index.js'

import { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } from './errors.js'

//instancia del servidor
const api = express()

//se crea una función para guardar la llamada de este middleware
const jsonBodyParser = json()

const port = 8080

api.use(cors())

//se ejecuta el metodo get cuando tiramos curl -> http://localhost:8080 y te devuelve (res) el objeto json de users
api.get('/', (req, res) => res.send('Hello, API!'))

//se ejecuta el metodo post cuando tiramos -> curl -X POST -d '{"name":"aaron", "age": "26"}' -H 'Content-Type: 'application/json' - v http://localhost:8080

// request body -> '{"name":"aaron", "age": "26"}'

//  ----- REGISTER METHOD -----
api.post('/users', jsonBodyParser, (req, res) => {
    //1. el jsonParse va a coger el objeto request y lo va a parsear
    //2. después se pasa a la req de al lado:(req), que la va a recibir ya parseada
    //3. una vez recibida, como está en js ya podemos desestructurarlo -> linea 30
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


//  ----- AUTHENTICATE-USER METHOD -----
api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        const id = logic.authenticateUser(username, password)

        res.json({ id })
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof CredentialsError) {
            status = 401
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})


//  ----- GET USERNAME METHOD -----
api.get('/users/self/name', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const name = logic.getUsername(userId)

        res.json({ name })
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


//  ----- GET POSTS METHOD -----
api.get('/posts', jsonBodyParser, (req, res) => {
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


//  ----- CREATEPOST METHOD -----
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
        } else if (error instanceof DuplicityError) {
            status = 409
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})


//  ----- DELETE POST METHOD-----
api.delete('/posts/:postId', jsonBodyParser, (req, res) => {
    try {
        const { headers: { authorization }, params: { postId } } = req

        const userId = authorization.slice(6)

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


//  ----- TOGGLE LIKE POST METHOD-----
api.patch('/posts/:postId/likes', jsonBodyParser, (req, res) => {
    try {
        const { headers: { authorization }, params: { postId } } = req

        const userId = authorization.slice(6)

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


//  ----- UPDATE POST TEXT METHOD-----
// * pongo la ruta self para que no colapse con el toggle
api.patch('/posts/:postId/text', jsonBodyParser, (req, res) => {
    try {
        const { headers: { authorization }, params: { postId }, body: { text } } = req

        const userId = authorization.slice(6)

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


api.listen(port, () => {
    console.log(`API running on port: ${port}`)
})