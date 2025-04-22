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
    getUserWorkoutsHandler,
    getWorkoutByIdHandler,
    createWorkoutHandler,
    deleteWorkoutHandler,
    filterWorkoutsHandler,
    toggleLikeWorkoutHandler,
    toggleSaveWorkoutHandler
} from "../handlers/workouts"


export const workoutRouter = Router()


// ---------- GET ROUTES ----------
// --- GET ALL WORKOUTS METHOD ---
workoutRouter.get(
    "/",
    authHandler,
    getAllWorkoutsHandler
)

// --- FILTER WORKOUTS ---
workoutRouter.get(
    '/filter',
    authHandler,
    filterWorkoutsHandler
)

// --- GET WORKOUT BY ID METHOD ---
workoutRouter.get(
    "/:workoutId",
    authHandler,
    getWorkoutByIdHandler
)

// --- GET USER WORKOUTS METHOD
workoutRouter.get(
    "/:targetUserId",
    authHandler,
    getUserWorkoutsHandler
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
    toggleLikeWorkoutHandler
)

//  --- TOGGLE SAVE WORKOUT METHOD ---
workoutRouter.patch(
    '/:workoutId/saves',
    authHandler,
    jsonBodyParser,
    toggleSaveWorkoutHandler
)

//  --- UPDATE/EDIT WORKOUT METHOD ---
workoutRouter.patch(
    '/:workoutId/update',
    authHandler,
    jsonBodyParser,
    //createWorkoutHandler
)