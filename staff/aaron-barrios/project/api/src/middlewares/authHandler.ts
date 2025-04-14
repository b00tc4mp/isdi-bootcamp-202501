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

        //5️ Extraemos el `id` de dentro del `sub`
        // Aquí asumimos que cuando firmaste el token hiciste: jwt.sign({ sub: { id, role } }, ...)
        //le digo que la req es la mia custom que tiene una       propiedad userId para igualarlo al que extraigo del sub
        const decode = jwt.verify(token, JWT_SECRET!) as unknown as { sub: { id: string, role: string } };
        (req as AuthHandlerRequest).userId = decode.sub.id as string

        next()
    } catch (error) {
        next(error)
    }
}

export default authHandler