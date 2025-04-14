import 'dotenv/config' //acceder a variables de entorno
import express from 'express' //framework para crear el servidor
import cors from 'cors' //permite que el frontend pueda acceder a las peticiones de backend

import { users } from './routes/users.js'
import { menus } from './routes/menus.js'
// import { orders } from './routes/orders'

import { errorHandler } from './handlers/errorHandler.js'
import { data } from './data/index.js'

const { PORT, MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error)
    .then(() => {
        const api = express()

        api.use(cors())
        api.use(express.json())

        api.get('/', (req, res) => res.send('Little breakfast is here!'))

        api.use('/users', users)
        api.use('/home', menus)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on port ${PORT}`))
    })

