import 'dotenv/config'
import express from 'express'
//import cors from 'cors'

import { data } from './data/index.js'

const { PORT, MONGO_URL, DB_NAME } = process.env

data.connect(MONGO_URL, DB_NAME)
    .catch(console.error)
    .then(() => {
        const api = express()

        api.get('/', (req, res) => res.send('API is working ❤️'))

        api.listen(PORT, () => console.log(`Server is working on PORT ${PORT}`))
    })
