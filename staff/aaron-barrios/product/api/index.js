import express, { json } from 'express'

import { logic } from './logic/index.js'

import { CredentialsError, DuplicityError, NotFoundError, SystemError } from './errors.js'

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

//como hay un -d identificamos el método como post
// body request -> '{"name":"aaron", "age": "26"}'
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

api.listen(port, () => {
    console.log(`API running on port: ${port}`)
})