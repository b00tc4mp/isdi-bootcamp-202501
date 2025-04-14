import 'dotenv/config'
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

import { AuthHandlerRequest } from './types'
import { validate, errors } from 'com'

const { JWT_SECRET } = process.env
const { NotFoundError, StatusError } = errors

const authHandler = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        // 1️⃣ Validamos si viene la cabecera Authorization y si empieza por "Bearer "
        const { authorization } = req.headers
        if (!authorization?.startsWith("Bearer "))
            throw new NotFoundError("Missing token")

        // 2️⃣ Extraemos el token (quitamos el "Bearer ")
        const token = authorization.slice(7)

        // 3️⃣ Validamos sintácticamente el token con tu propio regex (estructura JWT)
        validate.token(token)

        // 4️⃣ Verificamos el token usando el secreto → esto también lo decodifica
        const tokenPayload = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload

        // 5️⃣ Extraemos el `id` de dentro del `sub`
        // Aquí asumimos que cuando firmaste el token hiciste: jwt.sign({ sub: { id, role } }, ...)
        const userId = typeof tokenPayload.sub === "object" && tokenPayload.sub !== null
            ? (tokenPayload.sub as any).id
            : tokenPayload.sub

        // 6️⃣ Aseguramos que el userId es una string válido (evita errores tontos)
        validate.string(userId);

        // 7️⃣ Casteamos request con AuthHandlerRequest para poder ponerle esa propiedad nueva (id)
        (req as AuthHandlerRequest).userId = userId

        // 8️⃣ Continuamos al siguiente middleware o handler
        next()

    } catch (error) {
        // 9️⃣ Si algo falla, lo enviamos al errorHandler global
        next(error)
    }
}

export default authHandler