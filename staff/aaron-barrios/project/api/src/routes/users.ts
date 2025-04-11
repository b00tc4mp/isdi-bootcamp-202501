import { Router } from "express"
import validationHandler from "../middlewares/validationHandler"
import {
    registerUserSchema,
    authenticateUserSchema
} from "../data/schemas/zodSchemas"
import registerUserHandler from "../handlers/registerUserHandler"
import authenticateUserHandler from "../handlers/authenticateUserHandler"
import jsonBodyParser from "../middlewares/jsonBodyParser"
// import authHandler from "../middlewares/authHandler.js"

//instancia que creamos que utilizaremos para la llamada de cada petición a la API
export const userRouter = Router()


// --- GET USER ALIAS METHOD ---
// userRouter.get("/self/alias', authHandler, getUserAliasHandler)


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
