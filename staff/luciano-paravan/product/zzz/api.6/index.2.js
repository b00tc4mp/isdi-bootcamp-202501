import express, { json } from 'express'
import cors from 'cors'
import { errors } from 'com'
import jwt from 'jsonwebtoken' //jwt interviene desde la authentication en adelante, en cualquier otra ruta que venga despues va a haber que usarlo para verificar el usuario

import { data } from './data/index.js' //Antes de crear todo debo conectar con data, mas abajo data.connect
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors

const JWT_SECRET = 'el secreto v1'

const respondWithError = (res, error) => {
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

    res.status(status).json({ error: error.name, message: error.message })
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

data.connect('mongodb://localhost:27017', 'test') //No va a funcionar si no conectamos con Mongo, entonces hago el connect
    .catch(console.error) //Si falla la conexion, nos lleva a este catch
    .then(() => { //Una vez conectados, montamos el servidor
        const api = express()

        const jsonBodyParser = json()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, API!'))

        api.post('/users', jsonBodyParser, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { name, email, username, password } = req.body

                return logic.registerUser(name, email, username, password)
                    .then(() => res.status(201).send()) //HAPPY. Como es asincrono, hay que poner la res.status una vez devuelva el register. No devuelve nada a nivel de datos.
            })
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(id => {
                        const token = jwt.sign({ sub: id }, JWT_SECRET) //Se envian los datos, sub (subject) es un estandar. Nos devuelve el token

                        res.json({ token }) //Devolvemos el token
                    })
            })
        })

        api.get('/users/self/name', (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers //Para acceder a la cabecera del curl -H 'Authorization...'
                //Enviaremos un token

                const token = authorization.slice(7) //Extraigo el valor de la autorization del curl con slice cortando desde ese indice hasta el final, lo que esta despues de Basic

                const { sub: userId } = jwt.verify(token, JWT_SECRET) //El token generado en authentication se verifica aca

                return logic.getUserName(userId)
                    .then(name => { res.json({ name }) }) //hay que retornarlo en forma de JSON
            })
        })

        api.post('/posts', jsonBodyParser, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7) //Extraigo el valor de la autorization del curl con slice cortando desde ese indice hasta el final, lo que esta despues de Basic

                const { sub: userId } = jwt.verify(token, JWT_SECRET) //El token generado en authentication se verifica aca

                const { image, text } = req.body

                logic.createPost(userId, image, text)
                    .then(res.status(201).send())
            })
        })

        api.get('/posts', (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7) //Extraigo el valor de la autorization del curl con slice cortando desde ese indice hasta el final, lo que esta despues de Basic

                const { sub: userId } = jwt.verify(token, JWT_SECRET) //El token generado en authentication se verifica aca

                return logic.getPosts(userId)
                    .then(posts => res.json(posts))
            })
        })

        api.delete('/posts/:postId', jsonBodyParser, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7) //Extraigo el valor de la autorization del curl con slice cortando desde ese indice hasta el final, lo que esta despues de Basic

                const { sub: userId } = jwt.verify(token, JWT_SECRET) //El token generado en authentication se verifica aca

                const { postId } = req.params

                return logic.deletePost(userId, postId)
                    .then(post => res.status(204).send()) //204 ha ido todo bien y no hay body que responder, no hay contenido de respuesta.
            })
        })

        api.patch('/posts/:postId/likes', (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7) //Extraigo el valor de la autorization del curl con slice cortando desde ese indice hasta el final, lo que esta despues de Basic

                const { sub: userId } = jwt.verify(token, JWT_SECRET) //El token generado en authentication se verifica aca

                const { postId } = req.params

                return logic.toggleLikePost(userId, postId)
                    .then(res.status(204).send())
            })
        })

        api.patch('/posts/:postId/text', jsonBodyParser, (req, res) => {
            handleWithErrorHandling(res, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7) //Extraigo el valor de la autorization del curl con slice cortando desde ese indice hasta el final, lo que esta despues de Basic

                const { sub: userId } = jwt.verify(token, JWT_SECRET) //El token generado en authentication se verifica aca

                const { postId } = req.params

                const { text } = req.body

                return logic.updatePostText(userId, postId, text)
                    .then(() => res.status(204).send())
            })
        })

        api.listen(8080, () => console.log(`API running on port ${8080}`))
    })




