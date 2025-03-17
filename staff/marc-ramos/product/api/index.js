import express, { json } from 'express'

import cors from 'cors'

import { logic } from './logic/index.js'

import { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } from './errors.js'

const api = express() // inicializamos la aplicación, creamos una instancia de la aplicación para manejar rutas, peticiones y respuestas

const PORT = 8080 // especificamos que nuestro servidor trabajara con el puerto 8080

const jsonBodyParser = json() // creamos una instancia del middleware json() que convierte el cuerpo de las solicitudes que contienen json en objetos js, es necesario para poder acceder a los datos enviados en el cuerpo de una solicitud POST

api.use(cors())

api.get('/hello', (req, res) => {
    console.log(req.path)

    res.send('Hello, World!')
})

api.post('/users', jsonBodyParser, (req, res) => { // creamos un nuevo usuario, el jsonBodyParser se utiliza como middleware para asegurarse de que el cuerpo de la solicitud esté en formato json
    try {
        const { name, email, username, password } = req.body // extraemos los datos del cuerpo de la solicitud

        logic.registerUser(name, email, username, password) // registramos un nuevo usuario

        res.status(201).send() // si no ocurre ningún error, pasamos un 201 conforme se ha creado correctamente
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError){
            status = 400
            errorName = error.constructor.name

        } else if (error instanceof DuplicityError) {
            status = 409
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.post('/users/auth', jsonBodyParser, (req, res) => { // ruta para autenticar un usuario
    try {
        const { username, password } = req.body // extraemos los datos

        const id = logic.authenticateUser(username, password) // autenticamos al usuario con las credenciales proporcionadas

        res.json({ id }) // si hay éxito, se responde con el id del usuario
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

        res.status(status).json({ error: errorName, message: error.message}) // se responde con un código de estado y un objeto json que contiene detalles del error
    }
})

api.post('/posts', jsonBodyParser, (req, res) => { // creamos un nuevo post, el jsonBodyParser se utiliza como middleware para asegurarse de que el cuerpo de la solicitud esté en formato json
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { image, text } = req.body // extraemos los datos del cuerpo de la solicitud

        logic.createPost(userId, image, text) // registramos un nuevo usuario

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
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

api.delete('/posts/:postId', (req, res) => { // creamos un nuevo post, el jsonBodyParser se utiliza como middleware para asegurarse de que el cuerpo de la solicitud esté en formato json
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { postId } = req.params // extraemos los datos del cuerpo de la solicitud

        logic.deletePost(userId, postId) // eliminamos una publicacion

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

api.get('/posts', (req, res) => { // creamos un nuevo post, el jsonBodyParser se utiliza como middleware para asegurarse de que el cuerpo de la solicitud esté en formato json
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

api.get('/users/self/name', (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const name = logic.getUserName(userId)

        res.json({ name })
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

api.patch('/posts/:postId/text', jsonBodyParser, (req, res) => {
    try {
        const { authorization } =req.headers

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

api.listen(PORT, () => console.log(`API running on port ${PORT}`)) // arrancamos el servidor
