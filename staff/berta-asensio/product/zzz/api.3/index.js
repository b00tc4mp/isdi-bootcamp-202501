import express from 'express'
import cors from 'cors'
import { errors } from 'com'
import jwt from 'jsonwebtoken'


import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors

// Creamos el secreto para el token
const JWT_SECRET = 'Hola Didi'

data.connect('mongodb://localhost:27017', 'test')
    .catch(console.error)
    .then(() => {
        //montamos la api
        const api = express()

        //esta función json() que viene con express, parsea y convierte a objeto.
        const jsonBodyParser = express.json()

        //llamamos a cors. Cuando ponemos use, significa que lo usará en todas las rutas. Y por cada ruta devolverá acces control allow origin.
        api.use(cors())

        //servidor para comprobar que la api está viva. ping.sh
        api.get('/', (req, res) => res.send('Hello, API!'))

        /*REGISTER USER
        -Entre la ruta y la función req, res pondremos un middleware para que pase antes por ahi. Este middleware será la función Bodyparser
        -Cuando desde curl llamemos a /users, pasará por jsonBodyParser el cual mandará la data que yo le pase de registro de usuario a request.body
        en forma de json {"":""}.
        -Asi que la data pasará a body como propiedad de la request.
        */
        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, username, password, email } = req.body

                logic.registerUser(name, username, password, email)
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

        //AUTHENTICATE USER
        /*
        Token: para probar: test/authenticate-user.sh
        -Creamos un token y firmamos transportando el id y el secreto.
        -Una vez hecha la verificación, el servidor nos responderá con el token.
        -Este token es lo que se guardará en SessionStorage. Ya no guardaremos más el id, 
        y se guardará para ser utilizado en las siguientes rutas.
        MIRAR LIBRETA, token bien explicado.
        */
        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body 

                logic.authenticateUser(username, password) 
                    .then(id => {
                        const token = jwt.sign({ sub: id}, JWT_SECRET)
                        res.json({ token })
                    })
                    .catch(error => {
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

        //GET USERNAME

        api.get('/users/self/name', (req, res) => {
            try {
                const { authorization } = req.headers 

                const token = authorization.slice(7)
                
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.getUserName(userId)
                    .then(name => res.json({ name }))
                    .catch(error => {
                        console.error(error)

                        let status = 500
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        }

                        res.status(status).json({ error: errorName, message: error.message })
                            })

            } catch (error) {
                console.error(error)

                let status = 500
                let errorName = SystemError.name

                if(error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        //CREATE POST

        api.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET) 

                logic.createPost(userId, image, text)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        console.error(error)

                        let status = 500
                        let errorName = SystemError.name
        
                        if (error instanceof NotFoundError) {
                            status = 404
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

        //GET POSTS
        api.get('/posts', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.getPosts(userId)
                    .then(posts => res.json(posts))
                    .catch(error => {
                        console.error(error)

                        let status = 500
                        let errorName = SystemError.name
                         
                        if (error instanceof NotFoundError) {
                            status = 404
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

        //DELETE POST
        api.delete('/posts/:postId', (req, res) => {
            try {
 
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                logic.deletePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        console.error(error)

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

        //TOGGLE LIKE POST

        api.patch('/posts/:postId/likes', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                logic.toggleLikePost(userId, postId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        console.error(error)

                        let status = 500;
                        let errorName = SystemError.name

                        if (error instanceof NotFoundError) {
                            status = 404
                            errorName = error.constructor.name
                        }
                        res.status(status).json({ error: errorName, message: error.message })
                    })      
            } catch (error) {
                console.error(error)

                let status = 500;
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name;
                }
                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        //UPDATE POST TEXT
        api.patch("/posts/:postId/text", jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                const { text } = req.body

                logic.updatePostText(userId, postId, text)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        console.error(error)
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

        api.listen(8080, () => console.log('API running on post 8080'))

    })





//vinculados a los sh (curls).
//terminal: test/nombre-test.sh