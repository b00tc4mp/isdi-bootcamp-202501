import "dotenv/config"
import express, { Request, Response } from "express"
import cors from "cors"

import { errorHandler } from "./middlewares"
import loggers from "./logs/index"

import { data } from "./data/index"
import { userRouter } from "./routes/users"
import { workoutRouter } from "./routes/workouts"
import { routineRouter } from "./routes/routines"

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

        api.use(cors())

        // --- ROUTES --- 
        api.use("/users", userRouter)
        api.use("/workouts", workoutRouter)
        api.use("/routines", routineRouter)


        // api.get("/", (req, res) => res.send("Hello, API!"))
        api.get("/ping", (_req: Request, res: Response) => {
            res.json({ message: "pong 🏓" });
        })

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`Listening on port:${PORT}`))
    })