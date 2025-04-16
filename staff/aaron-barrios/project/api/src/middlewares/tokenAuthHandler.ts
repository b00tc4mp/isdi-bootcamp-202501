import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { AuthHandlerRequest } from "./types"
import { errors } from "com"
import { User } from "../data"

const { AuthorizationError } = errors
const JWT_SECRET = process.env.JWT_SECRET!

export default async function authHandler(req: Request, _res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) throw new AuthorizationError("Token missing")

        const token = authHeader.replace("Bearer ", "")
        const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; role: string; exp: number }

        // Check if token expired manually
        const now = Math.floor(Date.now() / 1000)
        const isExpired = decoded.exp && decoded.exp < now

        if (decoded.role === "anonym" && isExpired) {
            await User.findByIdAndDelete(decoded.sub)
            throw new AuthorizationError("Token expired, anonymous user removed")
        }

        (req as AuthHandlerRequest).userId = decoded.sub // inyectamos userId para el resto del handler
        next()
    } catch (error) {
        next(new AuthorizationError("Invalid or expired token"))
    }
}
