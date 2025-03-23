import express from 'express'
import cors from 'cors'
import { errors } from 'com'


import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors

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

                res.status(status).json({ error: errorName, message: error.message }) 
            }
        })

        //AUTHENTICATE USER

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body 

                logic.authenticateUser(username, password) 
                    .then(id => res.json({ id }))
                    .catch(error => {
                        console.error(error)

                        let status = 500 
                        let errorName = SystemError.name 
        
                        if (error instanceof ValidationError) { 
                            status = 400
                            errorName = error.constructor.name
                        } 
                        res.status(status).json({ error: errorName, message: error.message })
                    })

            } catch (error) {
               

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

        //GET USERNAME

        api.get('/users/self/name', (req, res) => {
            try {
                const { authorization } = req.headers //de esta manera accedo al -H de curl. Esto seria lo mismo que req.headers.authorization

                const userId = authorization.slice(6)  //queremos cortar el string que devuelve authorization que es: Basic <user-id>. Asi que contamos los caracteres que vamos a cortar. Será desde el 6 hasta el final, es decir: <user-id>

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

                const userId = authorization.slice(6)

                const { image, text } = req.body //ponemos en body los datos recogidos y pasados a json por BodyParser

                logic.createPost(userId, image, text)

                res.status(201).send() //devolvemos 201 como que todo ok y no mandamos mensaje.
            } catch (error) {
                console.error(error)

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) { //error de validación
                    status = 400
                    errorName = error.constructor.name
                } else if (error instanceof NotFoundError) {//por si el usuario no existe
                    status = 404
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        //GET POSTS
        api.get('/posts', (req, res) => {
            try {
                const { authorization } = req.headers

                const userId = authorization.slice(6)

                const posts = logic.getPosts(userId)

                res.json(posts) //No hace falta poner status, devolvemos los posts en forma de json.
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

        //DELETE POST
        api.delete('/posts/:postId', (req, res) => {
            try {
                //necesitamos autorización usuario:
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                const { postId } = req.params;
                //Mi usuario te dice que borres un post
                logic.deletePost(userId, postId);

                res.status(204).send(); //ha ido todo bien, y no hay body que responder
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
        });

        //TOGGLE LIKE POST

        api.patch('/posts/:postId/likes', (req, res) => {
            try {
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                const { postId } = req.params;

                logic.toggleLikePost(userId, postId);

                res.status(204).send();
            } catch (error) {
                console.error(error);

                let status = 500;
                let errorName = SystemError.name;

                if (error instanceof ValidationError) {
                    status = 400;
                    errorName = error.constructor.name;
                } else if (error instanceof NotFoundError) {
                    status = 404;
                    errorName = error.constructor.name;
                }
                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        //UPDATE POST TEXT
        /*
        -Autorizamos id usuario y lo guardamos en headers.
        -Guardamos id del post en params.
        -Guardamos texto a actualizar (pasado por bodyparser) en body.
        */
        api.patch("/posts/:postId/text", jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                const { postId } = req.params;

                const { text } = req.body;

                logic.updatePostText(userId, postId, text);

                res.status(204).send();
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
        });


        api.listen(8080, () => console.log('API running on post 8080'))

    })





//vinculados a los sh (curls).
//terminal: test/nombre-test.sh