import { Router } from "express"
import validationHandler from "../middlewares/validationHandler.js"
import {
    registerUserSchema,
    authenticateUserSchema
} from '../data/schemas/zodSchemas.js'
import registerUserHandler from "../handlers/registerUserHandler.js"
import jsonBodyParser from "../middlewares/jsonBodyParser.js"
import authenticateUserHandler from "../handlers/authenticateUserHandler.js"
// import authHandler from "../middlewares/authHandler.js"

//instancia que creamos que utilizaremos para la llamada de cada petición a la API
export const userRouter = Router()


// --- GET USER ALIAS METHOD ---
// userRouter.get('/self/alias', authHandler, getUserAliasHandler)


// --- REGISTER USER METHOD ---
userRouter.post(
    '/users',
    jsonBodyParser,
    validationHandler(registerUserSchema),
    registerUserHandler
)


// --- AUTHENTICATE USER METHOD ---
userRouter.post(
    '/auth',
    jsonBodyParser,
    validationHandler(authenticateUserSchema),
    authenticateUserHandler
)
