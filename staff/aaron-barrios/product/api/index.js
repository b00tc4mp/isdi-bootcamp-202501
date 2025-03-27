import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'
import { errors } from 'com'
import jwt from 'jsonwebtoken'

import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors

const {JWT_SECRET, PORT, MONGO_URL , MONGO_DB } = process.env

const withErrorHandling = callback => {
    return (req, res, next) => {
        try {
            callback(req, res)
                //ERRORES ASÍNCRONOS
                .catch(error => next(error))
            //ERRORES SÍNCRONOS
        } catch (error) {
            next(error)
        }
    }
}

data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error)
    .then(() => {
        //instancia del servidor
        const api = express()

        //se crea una función para guardar la llamada de este middleware
        const jsonBodyParser = json()

        api.use(cors())

        //se ejecuta el metodo get cuando tiramos curl -> http://localhost:8080 y te devuelve (res) el objeto json de users
        api.get('/', (req, res) => res.send('Hello, API!'))

        //se ejecuta el metodo post cuando tiramos -> curl -X POST -d '{"name":"aaron", "age": "26"}' -H 'Content-Type: 'application/json' - v http://localhost:8080

        // request body -> '{"name":"aaron", "age": "26"}'


        //  ----- REGISTER METHOD -----
        api.post('/users', jsonBodyParser, withErrorHandling((req, res) => {
            //1. el jsonParse va a coger el objeto request y lo va a parsear
            //2. después se pasa a la req de al lado:(req), que la va a recibir ya parseada
            //3. una vez recibida, como está en js ya podemos desestructurarlo -> linea 57

                const { name, email, username, password } = req.body

                return logic.registerUser(name, email, username, password)
                    .then(() => res.status(201).send())
        }))


        //  ----- AUTHENTICATE-USER METHOD -----
        api.post('/users/auth', jsonBodyParser, withErrorHandling((req, res) => {
                const { username, password } = req.body

                return logic.authenticateUser(username, password)
                    .then(id => {
                        const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '1h' })

                        res.json({ token })
                    })
            }))


        //  ----- GET USERNAME METHOD -----
        api.get('/users/self/name', jsonBodyParser, withErrorHandling((req, res) => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.getUsername(userId)
                    .then(name => res.json({ name }))
            }))


        //  ----- GET POSTS METHOD -----
        api.get('/posts', jsonBodyParser, withErrorHandling((req, res) => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.getPosts(userId)
                    .then(posts => res.json(posts))
            }))


        //  ----- CREATEPOST METHOD -----
        api.post('/posts', jsonBodyParser, withErrorHandling((req, res) => {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { image, text } = req.body

                return logic.createPost(userId, image, text)
                    .then(() => res.status(201).send())
            }))


        //  ----- DELETE POST METHOD-----
        api.delete('/posts/:postId', jsonBodyParser, withErrorHandling((req, res) => {
                const { headers: { authorization }, params: { postId } } = req

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.deletePost(userId, postId)
                    .then(() => res.status(204).send())
            }))


        //  ----- TOGGLE LIKE POST METHOD-----
        api.patch('/posts/:postId/likes', jsonBodyParser, withErrorHandling((req, res) => {
                const { headers: { authorization }, params: { postId } } = req

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.toggleLikePost(userId, postId)
                    .then(() => res.status(204).send())
            }))


        //  ----- UPDATE POST TEXT METHOD-----
        api.patch('/posts/:postId/text', jsonBodyParser, withErrorHandling((req, res) => {
                const { headers: { authorization }, params: { postId }, body: { text } } = req

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.updatePostText(userId, postId, text)
                    .then(() => res.status(204).send())
            }))

        const errorHandler = (error, req, res, next) => {
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
            } else if (error instanceof OwnershipError) {
                status = 403
                errorName = error.constructor.name
            } else if (error instanceof DuplicityError) {
                status = 409
                errorName = error.constructor.name
            }


            res.status(status).json({ error: errorName, message: error.message })
        }

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on port: ${PORT}`))
    })


