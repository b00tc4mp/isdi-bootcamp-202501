import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { data } from './data/index.js'

import { users, levels } from './routes/index.js'
import { errorHandler } from './handlers/errorHandler.js'

const { PORT, MONGO_URL, MONGO_DB_TEST } = process.env

data.connect(MONGO_URL, MONGO_DB_TEST)
    .catch(error => console.error(error))
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (_req, res) => res.send('Hello, World'))

        api.use('/users', users)
        api.use('/levels', levels)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on post ${PORT}`))
    })










































































