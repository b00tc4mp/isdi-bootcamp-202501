import 'dotenv/config' // importa las variables de entorno del fichero ignorado .env
import express from 'express'  //Frameword para construir APIs en Node.js
import cors from 'cors' // Middleware para permitir que el servidor acepte peticiones de diferentes orígenes
import { errors } from 'com'
import jwt from 'jsonwebtoken' //bliblioteca para manejar los tokens y autenticar los usuarios.


import { data } from './data/index.js'
import { logic } from './logic/index.js'

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors

const { JWT_SECRET, PORT, MONGO_URL, MONGO_DBNAME } = process.env // nos destructuramos el secreto desde el archivo ignorado .env

// Middleware que envuelve una función para manejar errores síncronos y asíncronos.
const withErrorHandling = callback => {
    return (req, res, next) => {
        try {
            callback(req, res)
                .catch(error => next(error)) //captura errores asíncronos
        } catch (error) {
            next(error) // captura errores síncronos
        }
    }
}

//Conexión con la base de datos, si la conexión es exitosa, se monta la api.
data.connect(MONGO_URL , MONGO_DBNAME) 
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


    /*
    RUTAS DE LA API: 
    -Se definen diferentes rutas donde cada una realiza una acción.
    -Cada ruta utiliza el middleware withErrorHandling para envolver todas las operaciones y garantizar que
    cualquier error que ocurra sea manejado.
    -Al final de todas las rutas, se define un middleware para el manejo de rutas global (const errorHandler = (error, req, res, next) => { ... })
    

    */
        /*REGISTER USER
        -Entre la ruta y la función req, res pondremos un middleware para que pase antes por ahi. Este middleware será la función Bodyparser
        -Cuando desde curl llamemos a /users, pasará por jsonBodyParser el cual mandará la data que yo le pase de registro de usuario a request.body
        en forma de json {"":""}.
        -Asi que la data pasará a body como propiedad de la request.
        */

        api.post('/users', jsonBodyParser, withErrorHandling((req, res) => {
            const { name, username, password, email } = req.body

            return logic.registerUser(name, username, password, email)
                .then(() => res.status(201).send())
        }))

        //AUTHENTICATE USER
        /*
        Token: para probar: test/authenticate-user.sh
        -Creamos un token y firmamos transportando el id y el secreto.
        -Una vez hecha la verificación, el servidor nos responderá con el token.
        -Este token es lo que se guardará en SessionStorage. Ya no guardaremos más el id, 
        y se guardará para ser utilizado en las siguientes rutas.
        MIRAR LIBRETA, token bien explicado.
        */
        api.post('/users/auth', jsonBodyParser, withErrorHandling((req, res) => {
            const { username, password } = req.body

            return logic.authenticateUser(username, password)
                .then(id => {
                    const token = jwt.sign({ sub: id }, JWT_SECRET)
                    res.json({ token })
                })
        }))

        //GET USERNAME

        api.get('/users/self/name', withErrorHandling((req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            return logic.getUserName(userId)
                .then(name => res.json({ name }))
        }))

        //CREATE POST

        api.post('/posts', jsonBodyParser, withErrorHandling((req, res) => {
            const { authorization } = req.headers
            const { image, text } = req.body

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            return logic.createPost(userId, image, text)
                .then(() => res.status(201).send())
        }))

        //GET POSTS
        api.get('/posts', withErrorHandling((req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            return logic.getPosts(userId)
                .then(posts => res.json(posts))
        }))

        //DELETE POST
        api.delete('/posts/:postId', withErrorHandling((req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { postId } = req.params

            return logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        //TOGGLE LIKE POST

        api.patch('/posts/:postId/likes', withErrorHandling((req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { postId } = req.params

            return logic.toggleLikePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        //UPDATE POST TEXT
        api.patch("/posts/:postId/text", jsonBodyParser, withErrorHandling((req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { postId } = req.params

            const { text } = req.body

            return logic.updatePostText(userId, postId, text)
                .then(() => res.status(204).send())
        }))

        const errorHandler = (error, req, res, next) => {
            console.error(error)

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

            res.status(status).json({ error: errorName, message: error.message })
        }

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on post ${PORT}`))

    })


//terminal: test/nombre-test.sh