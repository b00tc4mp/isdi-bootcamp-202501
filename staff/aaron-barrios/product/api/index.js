import express, { json } from 'express'

import { logic } from './logic/index.js'

import { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError } from './errors.js'

//instancia del servidor
const api = express()

//se crea una función para guardar la llamada de este middleware
const jsonBodyParser = json()

const port = 8080

//se ejecuta el metodo get cuando tiramos curl -> http://localhost:8080 y te devuelve (res) el objeto json de users
api.get('/', (req, res) => {
    res.json(users)
})

//se ejecuta el metodo post cuando tiramos -> curl -X POST -d '{"name":"aaron", "age": "26"}' -H 'Content-Type: 'application/json' - v http://localhost:8080

// body request -> '{"name":"aaron", "age": "26"}'
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

        if (error instanceof DuplicityError) {
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

        logic.authenticateUser(username, password)

        res.status(201).send()
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


//  ----- GET USERNAME METHOD -----
api.get('/users/:userId', jsonBodyParser, (req, res) => {
    try {
        const { userId } = req.params

        const username = logic.getUsername(userId)

        res.status(201).send({ username })
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        res.status(status).json({ error: errorName, message: error.message })
    }
})


//  ----- GET POSTS METHOD -----
api.get('/posts/:userId', jsonBodyParser, (req, res) => {
    try {
        const { userId } = req.params

        const posts = logic.getPosts(userId)

        res.status(201).send({ posts })
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        res.status(status).json({ error: errorName, message: error.message })
    }
})


//  ----- CREATEPOST METHOD -----
api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const { userId, image, text } = req.body

        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof DuplicityError) {
            status = 409
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})


//  ----- DELETE POST METHOD-----
api.delete('/posts/:postId', jsonBodyParser, (req, res) => {
    try {
        const { body: { userId }, params: { postId } } = req

        logic.deletePost(userId, postId)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof OwnershipError) {
            status = 401
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})


//  ----- TOGGLE LIKE POST METHOD-----
api.patch('/posts/:postId', jsonBodyParser, (req, res) => {
    try {
        const { body: { userId }, params: { postId } } = req

        logic.toggleLikePost(userId, postId)

        res.status(201).send()
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


//  ----- UPDATE POST TEXT METHOD-----
// * pongo el userId en params porque sino al tener la misma que el toggle no llega hasta aqui y no ejecuta el metodo
api.patch('/posts/:userId/:postId', jsonBodyParser, (req, res) => {
    try {
        const { body: { text }, params: { userId, postId } } = req

        logic.updatePostText(userId, postId, text)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        } else if (error instanceof OwnershipError) {
            status = 401
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})


api.listen(port, () => {
    console.log(`API running on port: ${port}`)
})