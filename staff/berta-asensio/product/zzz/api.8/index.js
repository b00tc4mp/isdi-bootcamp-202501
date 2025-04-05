import 'dotenv/config' // importa las variables de entorno del fichero ignorado .env
import express from 'express'  //Frameword para construir APIs en Node.js
import cors from 'cors' // Middleware para permitir que el servidor acepte peticiones de diferentes orígenes

import { users, posts } from './routes/index.js'

import { data } from './data/index.js'
import { errorHandler } from './handlers/index.js'

const { PORT, MONGO_URL, MONGO_DBNAME } = process.env // nos destructuramos el secreto desde el archivo ignorado .env

//Conexión con la base de datos, si la conexión es exitosa, se monta la api.
data.connect(MONGO_URL , MONGO_DBNAME) 
    .catch(console.error)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, API!'))

        api.use('/users', users)
        api.use('/posts', posts)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on post ${PORT}`))

    })


//terminal: test/nombre-test.sh