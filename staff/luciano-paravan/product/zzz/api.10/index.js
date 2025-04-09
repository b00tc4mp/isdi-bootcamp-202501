import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { posts, users } from './routes/index.js'
import { errorHandler } from './handlers/index.js'
import { data } from './data/index.js' //Antes de crear todo debo conectar con data, mas abajo data.connect

const { PORT, MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB) //No va a funcionar si no conectamos con Mongo, entonces hago el connect
    .catch(console.error) //Si falla la conexion, nos lleva a este catch
    .then(() => { //Una vez conectados, montamos el servidor
        const api = express()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, API!'))

        api.use('/users', users) //cualquier ruta que sea /users, ira por el enrutador users
        api.use('/posts', posts) //Le decimos a la api que para las rutas de posts /posts use el router de posts

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on port ${PORT}`))
    })