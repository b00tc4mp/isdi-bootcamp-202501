import express from 'express'
//const express = require('express')

//importamos logic
import { logic } from './logic/index.js'

import { CredentialsError, DuplicityError, NotFoundError, SystemError } from './errors.js'

//montamos la api
const api = express()

//esta función json() que viene con express, parsea y convierte a objeto.
const jsonBodyParser = express.json()

api.get('/hello', (req, res) => {
    console.log(req.path)
    res.send('Hello, World!')
})

/*montamos register (POST)
-Entre la ruta y la función req, res pondremos un middleware para que pase antes por ahi. Este middleware será la función Bodyparser
-Cuando desde curl llamemos a /users, pasará por jsonBodyParser el cual mandará la data que yo le pase de registro de usuario a request.body
en forma de json {"":""}.
-Asi que la data pasará a body como propiedad de la request.
*/
api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, username, password, email } = req.body

        logic.registerUser(name, username, password, email)

        res.status(201).send() //si todo va bien, respondemos con un estatus ok y no hace falta devolver nada. Dejamos send vacio.
    } catch (error) {
        console.error(error)

        let status = 500 //el estado
        let errorName = SystemError.name // el error: si el error no es suplicity, cualquier otro error mandar el mensaje de SystemError

        if (error instanceof DuplicityError) {
            status = 409
            errorName = error.constructor.name //es lo mismo que poner DuplicityError.name (ya que si el error es duplicity, su constructor será duplicityError)
        }
        res.status(status).json({ error: errorName, message: error.message }) //si hay error mandamos un status y un json indicando el error y un mensaje. Con esta estructura responderemos al cliente si hay un fallo.
    }
}) 

//AUTHENTICATE USER

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body // pasamos la data a body (ya ha pasado antes por  bodyparser y se ha convertido a json)

        const id = logic.authenticateUser(username, password) //llamamos a la funcion y en este caso devuelve el id del usuario

        res.json(id) //todo ok, no hace falta poner status, por defecto será 200. Devolvemos en forma de json el id del usuario
    } catch (error) {
        // esta funcion manera el error de credentials error en su logica asi que nos basaremos en ella

        let status = 500 // por defecto ponemos error 500
        let errorName = SystemError.name //si el error no es Credentials, cualquier otro error mandaremos System Error

        if(error instanceof CredentialsError) {
            status = 401
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        }
        res.status(status).json({ error: errorName, message: error.message })
    }
    
})


api.listen(8080, () => console.log('API running on post 8080'))



//vinculados a los sh (curls).