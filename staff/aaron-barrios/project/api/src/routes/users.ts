import { Router } from "express"

import {
    registerUserSchema,
    authenticateUserSchema
} from "../data/schemas/zodSchemas"

import {
    registerUserHandler,
    authenticateUserHandler
} from "../handlers/session"

import {
    getUserAliasHandler,
    getCurrentUserHandler
} from "../handlers/user/regular"

import {
    jsonBodyParser,
    authHandler,
    validationHandler,
    cleanUpUserIfTokenExpired
} from "../middlewares"

import {
    generateAnonymUserHandler,
    deleteAnonymUserHandler
} from "../handlers/user/anonym"

//instancia que creamos que utilizaremos para la llamada de cada petición a la API
export const userRouter = Router()


// -------------------- REGULAR USER ------------------
// --- GET USER ALIAS METHOD ---
userRouter.get(
    "/self/data",
    authHandler,
    getUserAliasHandler
)

// --- GET CURRENT USER METHOD ---
userRouter.get(
    "/self",
    authHandler,
    getCurrentUserHandler
)


// --- REGISTER USER METHOD ---
userRouter.post(
    "/",
    jsonBodyParser,
    validationHandler(registerUserSchema),
    registerUserHandler
)


// --- AUTHENTICATE USER METHOD ---
userRouter.post(
    "/auth",
    jsonBodyParser,
    validationHandler(authenticateUserSchema),
    authenticateUserHandler
)

// --- GET USER WORKOUTS METHOD --- (WIP)
userRouter.post(
    "/:targetUserId/workouts",
    jsonBodyParser,
    // validationHandler(authenticateUserSchema),
    // authenticateUserHandler
)

// --- GET USER WORKOUTS METHOD --- (WIP)
userRouter.post(
    "/:targetUserId/routines",
    jsonBodyParser,
    // validationHandler(authenticateUserSchema),
    // authenticateUserHandler
)



// -------------------- ANONYM USER ------------------
// --- GENERATE ANONYM USER METHOD ---
userRouter.post(
    "/auth/anon",
    cleanUpUserIfTokenExpired,
    generateAnonymUserHandler
)

// --- DELETE ANONYM USER METHOD ---
userRouter.delete(
    "/auth/anon",
    authHandler,
    deleteAnonymUserHandler
)