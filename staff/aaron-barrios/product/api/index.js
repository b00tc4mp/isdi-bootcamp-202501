const express = require('express')

const api = express()

const port = 8080

const users = [
    { name: 'euge', age: 33 },
    { name: 'masha', age: 25 }
]

//se crea una función para guardar la llamada de este middleware
const jsonParse = express.json()

//se ejecuta el metodo get cuando tiramos curl -> http://localhost:8080 y te devuelve (res) el objeto json de users
api.get('/', (req, res) => {
    res.json(users)
})

//se ejecuta el metodo post cuando tiramos -> curl -X POST -d '{"name":"aaron", "age": "26"}' -H 'Content-Type: 'application/json' - v http://localhost:8080

//como hay un -d identificamos el método como post
// body request -> '{"name":"aaron", "age": "26"}'
api.post('/user', jsonParse, (req, res) => {
    //1. el jsonParse va a coger el objeto request y lo va a parsear
    //2. después se pasa a la req de al lado:(req), que la va a recibir ya parseada
    //3. una vez recibida, como está en js ya podemos desestructurarlo -> linea 33
    console.log(req)

    // if (req.body === undefined)
    //     return res.status(404).json({ message: 'Need data bruh' }) 

    const { name, age } = req.body

    const newUser = {
        name, age
    }

    users.push(newUser)

    res.status(201).json({ message: 'User created!' })
})

api.listen(port, () => {
    console.log(`API running on port: ${port}`)
})