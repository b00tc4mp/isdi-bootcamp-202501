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
    getAllRoutinesHandler,
    createRoutineHandler,
    filterRoutinesHandler,
    getUserRoutinesHandler,
    getRoutineByIdHandler,
    getModeratorRoutinesHandler,
    deleteRoutineHandler,
    reviewRoutineHandler,
    toggleLikeRoutineHandler,
    toggleSaveRoutineHandler,
    editRoutineHandler
} from "../handlers/routines"



export const routineRouter = Router()

//------------------- REGULAR USER -------------------
// ---------- GET ROUTES ----------
// --- GET ALL ROUTINES METHOD ---
routineRouter.get(
    "/",
    authHandler,
    getAllRoutinesHandler
)

// --- FILTER ROUTINES METHOD ---
routineRouter.get(
    '/filter',
    authHandler,
    filterRoutinesHandler
)

// --- GET MOD ROUTINES METHOD ---
routineRouter.get(
    "/mod",
    authHandler,
    getModeratorRoutinesHandler
)

// --- GET ROUTINES BY ID METHOD ---
routineRouter.get(
    "/:routineId",
    authHandler,
    getRoutineByIdHandler
)

// --- GET USER ROUTINES METHOD
routineRouter.get(
    "/user/:targetUserId",
    authHandler,
    getUserRoutinesHandler
)

// ---------- POST ROUTES ----------
// --- CREATE ROUTINES METHOD ---
routineRouter.post(
    "/",
    jsonBodyParser,
    authHandler,
    validationHandler(createRoutineSchema),
    createRoutineHandler
)


// ----- DELETE ROUTES -----
// --- DELETE ROUTINES METHOD ---
routineRouter.delete(
    "/:routineId",
    authHandler,
    deleteRoutineHandler
)

// ---------- PATCH ROUTES ----------
// --- REVIEW ROUTINES METHOD ---
routineRouter.patch(
    "/review/:routineId",
    authHandler,
    jsonBodyParser,
    reviewRoutineHandler
)

//  --- TOGGLE LIKE ROUTINES METHOD ---
routineRouter.patch(
    '/:routineId/likes',
    authHandler,
    jsonBodyParser,
    toggleLikeRoutineHandler
)

//  --- TOGGLE SAVE ROUTINES METHOD ---
routineRouter.patch(
    '/:routineId/saves',
    authHandler,
    jsonBodyParser,
    toggleSaveRoutineHandler
)

//  --- EDIT ROUTINES METHOD ---
routineRouter.patch(
    '/:routineId/edit',
    authHandler,
    jsonBodyParser,
    editRoutineHandler
)