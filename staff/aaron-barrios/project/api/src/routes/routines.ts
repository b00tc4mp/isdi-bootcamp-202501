import { Router } from "express"

import {
    createRoutineSchema
} from "../data/zodSchemas/routineSchemas"

import {
    validationHandler,
    authHandler,
    jsonBodyParser
} from "../middlewares"

import {

} from "../handlers/routines"



export const routineRouter = Router()

//------------------- REGULAR USER -------------------
// ---------- GET ROUTES ----------
// --- GET ALL ROUTINES METHOD ---
routineRouter.get(
    "/",
    authHandler,
    // getAllRoutinesHandler
)

// --- FILTER Routines ---
routineRouter.get(
    '/filter',
    authHandler,
    // filterRoutinesHandler
)

// --- GET MOD ROUTINES METHOD ---
routineRouter.get(
    "/mod",
    authHandler,
    // getModeratorRoutinesHandler
)

// --- GET WORKOUT BY ROUTINES METHOD ---
routineRouter.get(
    "/:workoutId",
    authHandler,
    // getWorkoutByIdHandler
)

// --- GET USER ROUTINES METHOD
routineRouter.get(
    "/user/:targetUserId",
    authHandler,
    // getUserRoutinesHandler
)

// ---------- POST ROUTES ----------
// --- CREATE ROUTINES METHOD ---
routineRouter.post(
    "/",
    jsonBodyParser,
    authHandler,
    validationHandler(createRoutineSchema),
    // createWorkoutHandler
)

//  --- FILTER ROUTINES METHOD ---
routineRouter.post(
    '/:workoutId/filter',
    jsonBodyParser,
    // validationHandler(createRoutineschema),
    //createWorkoutHandler
)

// ----- DELETE ROUTES -----
// --- DELETE ROUTINES METHOD ---
routineRouter.delete(
    "/:workoutId",
    authHandler,
    // deleteWorkoutHandler
)

// ---------- PATCH ROUTES ----------
// --- REVIEW ROUTINES METHOD ---
routineRouter.patch(
    "/review/:workoutId",
    authHandler,
    jsonBodyParser,
    // reviewWorkoutHandler
)

//  --- TOGGLE LIKE ROUTINES METHOD ---
routineRouter.patch(
    '/:workoutId/likes',
    authHandler,
    jsonBodyParser,
    // toggleLikeWorkoutHandler
)

//  --- TOGGLE SAVE ROUTINES METHOD ---
routineRouter.patch(
    '/:workoutId/saves',
    authHandler,
    jsonBodyParser,
    // toggleSaveWorkoutHandler
)

//  --- UPDATE/EDIT ROUTINES METHOD ---
routineRouter.patch(
    '/:workoutId/update',
    authHandler,
    jsonBodyParser,
    //createWorkoutHandler
)