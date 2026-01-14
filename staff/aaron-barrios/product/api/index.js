import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import {users, posts} from './routes/index.js'
import {errorHandler} from './handlers/index.js'
import { data } from './data/index.js'

const { PORT, MONGO_URL , MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error)
    .then(() => {
        //instancia del servidor
        const api = express()

        api.use(cors())

        //se ejecuta el metodo get cuando tiramos curl -> http://localhost:8080 y te devuelve (res) el objeto json de users
        api.get('/', (req, res) => res.send('Hello, API!'))

        api.use('/users', users)
        api.use('/posts', posts)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on port: ${PORT}`))
    })


