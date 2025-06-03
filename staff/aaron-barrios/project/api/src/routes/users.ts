import { Router } from "express"

import {
    registerUserSchema,
    authenticateUserSchema
} from "../data/zodSchemas/userSchemas"


import {
    getUserAliasHandler,
    getSavedWorkoutsHandler,
    getMyWorkoutsHandler,
    updateUserDataHandler,
    getTargetUserDataHandler,
    getMyRoutinesHandler,
    getSavedRoutinesHandler
} from "../handlers/user/regular"

import {
    registerUserHandler,
    authenticateUserHandler,
    getCurrentUserHandler,
} from "../handlers/user/"

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

import {
    changePasswordHandler
} from "../handlers/user/mod"

//instancia que creamos que utilizaremos para la llamada de cada petición a la API
export const userRouter = Router()


// -------------------- REGULAR USER ------------------

// ----- GET ROUTES -----
// --- GET USER ALIAS METHOD ---
userRouter.get(
    "/self/alias",
    authHandler,
    getUserAliasHandler
)

// --- GET CURRENT USER METHOD ---
userRouter.get(
    "/self",
    authHandler,
    getCurrentUserHandler
)

// --- GET USER DATA METHOD ---
userRouter.get(
    "/data",
    authHandler,
    getCurrentUserHandler
)

// --- GET MY WORKOUTS METHOD
userRouter.get(
    "/workouts/self",
    authHandler,
    getMyWorkoutsHandler
)

// --- GET SAVED WORKOUTS METHOD
userRouter.get(
    "/workouts/self/saved",
    authHandler,
    getSavedWorkoutsHandler
)

// --- GET MY ROUTINES METHOD
userRouter.get(
    "/routines/self",
    authHandler,
    getMyRoutinesHandler
)

// --- GET SAVED ROUTINES METHOD
userRouter.get(
    "/routines/self/saved",
    authHandler,
    getSavedRoutinesHandler
)

// --- GET TARGET USER DATA METHOD
userRouter.get(
    "/:targetUserId/data",
    getTargetUserDataHandler
)


// --- GET USER ROUTINES METHOD --- (WIP)
userRouter.get(
    "/:targetUserId/routines",
    authHandler,
    // authenticateUserHandler
)


// ----- POST ROUTES -----
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

// ----- PATCH ROUTES -----
// --- UPDATE USER DATA METHOD ---
userRouter.patch(
    "/self",
    authHandler,
    jsonBodyParser,
    updateUserDataHandler
)

// --- CHANGE PASSWORD METHOD ---
userRouter.patch(
    "/password",
    authHandler,
    jsonBodyParser,
    changePasswordHandler
)


// -------------------- ANONYM USER ------------------

// ----- POST ROUTES -----
// --- GENERATE ANONYM USER METHOD ---
userRouter.post(
    "/auth/anon",
    cleanUpUserIfTokenExpired,
    generateAnonymUserHandler
)


// ----- DELETE ROUTES -----
// --- DELETE ANONYM USER METHOD ---
userRouter.delete(
    "/auth/anon",
    authHandler,
    deleteAnonymUserHandler
)