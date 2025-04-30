import { Router } from "express"

import {
    createRoutineSchema,
    updateCustomRoutineSchema
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
    editRoutineHandler,
    getMyCustomRoutinesHandler,
    saveCustomRoutineHandler,
    getCustomRoutineByIdHandler,
    updateCustomRoutineHandler,
    deleteCustomRoutineHandler,
    getRoutineOfTheDayHandler,
    getSuggestedRoutinesHandler
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

// --- GET CUSTOM ROUTINES METHOD ---
routineRouter.get(
    '/custom',
    authHandler,
    getMyCustomRoutinesHandler
)

// --- GET MOD ROUTINES METHOD ---
routineRouter.get(
    "/mod",
    authHandler,
    getModeratorRoutinesHandler
)

// --- GET SUGGESTTED ROUTINES METHOD ---
routineRouter.get(
    "/suggested",
    authHandler,
    getSuggestedRoutinesHandler
)

// --- GET ROUTINE OF THE DAY METHOD ---
routineRouter.get(
    "/of-the-day",
    authHandler,
    getRoutineOfTheDayHandler
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

// --- GET CUSTOM ROUTINE BY ID METHOD ---
routineRouter.get(
    '/custom/:routineId',
    authHandler,
    getCustomRoutineByIdHandler
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

// --- SAVE CUSTOM ROUTINES METHOD ---
routineRouter.post(
    "/:routineId/custom",
    jsonBodyParser,
    authHandler,
    saveCustomRoutineHandler
)


// ----- DELETE ROUTES -----
// --- DELETE ROUTINES METHOD ---
routineRouter.delete(
    "/:routineId",
    authHandler,
    deleteRoutineHandler
)


// --- DELETE CUSTOM ROUTINE METHOD ---
routineRouter.delete(
    "/custom/:routineId",
    authHandler,
    deleteCustomRoutineHandler
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

//  --- UPDATE CUSTOM ROUTINE METHOD ---
routineRouter.patch(
    '/:routineId/custom',
    authHandler,
    jsonBodyParser,
    validationHandler(updateCustomRoutineSchema),
    updateCustomRoutineHandler
)