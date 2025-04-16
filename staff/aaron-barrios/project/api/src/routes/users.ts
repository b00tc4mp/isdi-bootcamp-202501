import { Router } from "express"
import validationHandler from "../middlewares/validationHandler"
import {
    registerUserSchema,
    authenticateUserSchema
} from "../data/schemas/zodSchemas"
import registerUserHandler from "../handlers/registerUserHandler"
import authenticateUserHandler from "../handlers/authenticateUserHandler"
import getUserDataHandler from "../handlers/getUserDataHandler"
import jsonBodyParser from "../middlewares/jsonBodyParser"
import authHandler from "../middlewares/authHandler"
import generateAnonymUserHandler from "../handlers/generateAnonymUserHandler"
import cleanUpUserIfTokenExpired from "../middlewares/cleanUpUserIfTokenExpired"

//instancia que creamos que utilizaremos para la llamada de cada petición a la API
export const userRouter = Router()


// -------------------- REGULAR USER ------------------
// --- GET USER ALIAS METHOD ---
userRouter.get(
    "/self/data",
    authHandler,
    getUserDataHandler
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


// -------------------- ANONYM USER ------------------
// --- GENERATE ANONYM USER METHOD ---
userRouter.post(
    "/auth/anon",
    cleanUpUserIfTokenExpired,
    generateAnonymUserHandler
)
