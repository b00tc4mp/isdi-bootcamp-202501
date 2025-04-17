import { Router } from "express"
import validationHandler from "../middlewares/validationHandler"
import {
    registerUserSchema,
    authenticateUserSchema
} from "../data/schemas/zodSchemas"
import registerUserHandler from "../handlers/registerUserHandler"
import authenticateUserHandler from "../handlers/authenticateUserHandler"
import getUserDataHandler from "../handlers/getUserDataHandler"
import getCurrentUserHandler from "../handlers/getCurrentUserHandler"
import jsonBodyParser from "../middlewares/jsonBodyParser"
import authHandler from "../middlewares/authHandler"
import generateAnonymUserHandler from "../handlers/generateAnonymUserHandler"
import deleteAnonymUserHandler from "../handlers/deleteAnonymUserHandler"
import cleanUpUserIfTokenExpired from "../middlewares/cleanUpUserIfTokenExpired"

//instancia que creamos que utilizaremos para la llamada de cada petición a la API
export const userRouter = Router()


// -------------------- REGULAR USER ------------------
// --- GET USER DATA METHOD ---
userRouter.get(
    "/self/data",
    authHandler,
    getUserDataHandler
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