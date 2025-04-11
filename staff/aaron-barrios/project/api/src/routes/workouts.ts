import { Router } from "express"

import validationHandler from "../middlewares/validationHandler"
import {
    createWorkoutSchema
} from "../data/schemas/zodSchemas"
import jsonBodyParser from "../middlewares/jsonBodyParser"
// import authHandler from "../middlewares/authHandler"

export const workoutRouter = Router()

workoutRouter.post(
    "/",
    jsonBodyParser,
    validationHandler(createWorkoutSchema),
    //createWorkoutHandler
)