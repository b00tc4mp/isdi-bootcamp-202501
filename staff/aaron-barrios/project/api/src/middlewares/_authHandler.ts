import 'dotenv/config'
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AuthHandlerRequest } from './types'
import { validate } from 'com'

const { JWT_SECRET } = process.env

const authHandler = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers
        const token = authorization!.slice(7)
        validate.token(token)

        const { sub: userId } = jwt.verify(token, JWT_SECRET!);
        (req as AuthHandlerRequest).userId = userId as string // => le digo que la req es la mia custom que tiene una       propiedad userId para igualarlo al que extraigo del sub

        next()
    } catch (error) {
        next(error)
    }
}

export default authHandler