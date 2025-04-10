import 'dotenv/config'
import express, { Request, Response } from 'express'

import errorHandler from './middlewares/errorHandler.js'
import loggers from './logs/index.js'

import { data } from './data/index.js'

import { userRouter } from './routes/users.js'

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

        const PORT = process.env.PORT || 7070

        api.use(morganMiddleware)

        api.use("/users", userRouter);

        // api.get('/', (req, res) => res.send('Hello, API!'))
        api.get("/ping", (_req: Request, res: Response) => {
            res.json({ message: "pong 🏓" });
        })

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`Listening on port:${PORT}`))
    })