import "dotenv/config"
import express, { Request, Response } from "express"
import cors from "cors"

import errorHandler from "./middlewares/errorHandler"
import loggers from "./logs/index"

import { data } from "./data/index"
import { userRouter } from "./routes/users"
import { workoutRouter } from "./routes/workouts"

const { morganMiddleware } = loggers

const { MONGO_URI, MONGO_DB_NAME } = process.env


data.connect(MONGO_URI!, MONGO_DB_NAME!)
    .catch(error => {
        process.on("exit", () => {
            console.error(error.message)

            process.exit(1)
        })
    })
    .then(() => {
        const api = express()

        api.disable("x-powered-by") //-> que era esto?

        const PORT = process.env.PORT || 8080

        api.use(morganMiddleware)

        // ✅ ACTIVA CORS (para permitir llamadas desde tu frontend Expo Web)
        api.use(cors({
            origin: 'http://localhost:8081', // ⚠️ o el puerto que use Expo Web
            credentials: true
        }))


        // --- ROUTES --- 
        api.use("/users", userRouter)
        api.use("/workouts", workoutRouter)


        // api.get("/", (req, res) => res.send("Hello, API!"))
        api.get("/ping", (_req: Request, res: Response) => {
            res.json({ message: "pong 🏓" });
        })

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`Listening on port:${PORT}`))
    })