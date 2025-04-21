import { Router } from "express"

import {
    createWorkoutSchema
} from "../data/zodSchemas/workoutSchemas"

import {
    validationHandler,
    authHandler,
    jsonBodyParser
} from "../middlewares"

import {
    getAllWorkoutsHandler,
    getWorkoutByIdHandler,
    createWorkoutHandler,
    deleteWorkoutHandler
} from "../handlers/workouts"

export const workoutRouter = Router()


// ---------- GET ROUTES ----------
// --- GET WORKOUT BY ID METHOD ---
workoutRouter.get(
    "/:workoutId",
    authHandler,
    getWorkoutByIdHandler
)

// --- GET ALL WORKOUTS METHOD ---
workoutRouter.get(
    "/",
    authHandler,
    getAllWorkoutsHandler
)


// ---------- POST ROUTES ----------
// --- CREATE WORKOUT METHOD ---
workoutRouter.post(
    "/",
    jsonBodyParser,
    authHandler,
    validationHandler(createWorkoutSchema),
    createWorkoutHandler
)

//  --- FILTER WORKOUT METHOD ---
workoutRouter.post(
    '/:workoutId/filter',
    jsonBodyParser,
    // validationHandler(createWorkoutSchema),
    //createWorkoutHandler
)

// ----- DELETE ROUTES -----
// --- DELETE WORKOUT METHOD ---
workoutRouter.delete(
    "/:workoutId",
    authHandler,
    deleteWorkoutHandler
)


// ---------- PATCH ROUTES ----------
//  --- TOGGLE LIKE WORKOUT METHOD ---
workoutRouter.patch(
    '/:workoutId/likes',
    authHandler,
    jsonBodyParser,
    //createWorkoutHandler
)

//  --- SAVE WORKOUT METHOD ---
workoutRouter.patch(
    '/:workoutId/saves',
    authHandler,
    jsonBodyParser,
    //createWorkoutHandler
)

//  --- UPDATE/EDIT WORKOUT METHOD ---
workoutRouter.patch(
    '/:workoutId/update',
    authHandler,
    jsonBodyParser,
    //createWorkoutHandler
)