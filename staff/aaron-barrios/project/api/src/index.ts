import 'dotenv/config'
import express, { json, Request, Response } from 'express'
import registerUserHandler from './handlers/registerUserHandler.js'
import errorHandler from './middlewares/errorHandler.js'
import loggers from './logs/index.js'
import validationHandler from './middlewares/validationHandler.js'

import {
    registerUserSchema
} from './data/schemas/zodSchemas.js'
import { data } from './data/index.js'

const { morganMiddleware } = loggers

const { MONGO_URI, MONGO_DB_NAME } = process.env

data.connect(MONGO_URI!, MONGO_DB_NAME!)
    .catch(error => {
        process.on('exit', () => {
            console.error(error.message)

            process.exit(1)
        })
    })
    .then(() => {
        const api = express()

        api.disable('x-powered-by') //-> que era esto?

        const PORT = process.env.PORT || 7500

        api.use(morganMiddleware)

        const jsonBodyParser = json()

        // api.get('/', (req, res) => res.send('Hello, API!'))
        api.get("/ping", (_req: Request, res: Response) => {
            res.json({ message: "pong 🏓" });
        })

        // --- REGISTER USER METHOD ---
        api.post(
            '/users',
            jsonBodyParser,
            validationHandler(registerUserSchema),
            registerUserHandler
        )

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
    })