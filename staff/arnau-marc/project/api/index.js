import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { games, users, profiles, seasons } from './routes/index.js' // TODO GAME, SEASON
import { errorHandler } from './middlewares/index.js'

import { data } from './data/index.js'

const { PORT, MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, API!'))

        api.use('/users', users)
        api.use('/games', games)
        api.use('/seasons', seasons)
        api.use('/profiles', profiles)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on port ${PORT}`))
    })