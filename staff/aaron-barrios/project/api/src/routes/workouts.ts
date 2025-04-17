import { Router } from "express"

import validationHandler from "../middlewares/validationHandler"
import {
    createWorkoutSchema
} from "../data/schemas/zodSchemas"
import jsonBodyParser from "../middlewares/jsonBodyParser"
// import authHandler from "../middlewares/authHandler"

export const workoutRouter = Router()


// --- GET WORKOUT BY ID METHOD ---
workoutRouter.get(
    "/:workoutId",
    jsonBodyParser,
    // validationHandler(createWorkoutSchema),
    //createWorkoutHandler
)

// --- GET ALL WORKOUTS METHOD ---
workoutRouter.get(
    "/",
    jsonBodyParser,
    // validationHandler(createWorkoutSchema),
    //createWorkoutHandler
)

// --- CREATE WORKOUT METHOD ---
workoutRouter.post(
    "/",
    jsonBodyParser,
    // validationHandler(createWorkoutSchema),
    //createWorkoutHandler
)

//  ----- TOGGLE LIKE WORKOUT METHOD-----
workoutRouter.patch(
    '/:postId/likes',
    jsonBodyParser,
    //validationHandler(createWorkoutSchema),
    //createWorkoutHandler
)

//  ----- SAVE WORKOUT METHOD-----
workoutRouter.patch(
    '/:postId/saves',
    jsonBodyParser,
    //validationHandler(createWorkoutSchema),
    //createWorkoutHandler
)

//  ----- EDIT WORKOUT METHOD-----
workoutRouter.patch(
    '/:postId/update',
    jsonBodyParser,
    //validationHandler(createWorkoutSchema),
    //createWorkoutHandler
)