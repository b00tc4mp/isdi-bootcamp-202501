import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { users } from './routes/index.js'
import { errorHandler } from './handlers/errorHandler.js'
import { data } from './data/index.js'

const { PORT, MONGO_URL, DB_NAME } = process.env

data.connect(MONGO_URL, DB_NAME)
    .catch(console.error)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (req, res) => res.send('API is working ❤️'))

        api.use('/users', users)
        api.use('/clothing-items', clothingItems)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`Server is working on PORT ${PORT}`))
    })
