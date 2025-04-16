import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../data'

const { SECRET, ANONYM_TOKEN_TTL_SECONDS = '3600' } = process.env

export default async function cleanUpUserIfTokenExpired(req: Request, _res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader?.startsWith('Bearer ')) return next()

        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, SECRET!) as { sub: string; iat: number }

        const userId = payload.sub
        const iat = payload.iat * 1000 // convert to ms

        const user = await User.findById(userId)

        if (user?.role === 'anonym') {
            const now = Date.now()
            const ttlMs = parseInt(ANONYM_TOKEN_TTL_SECONDS) * 1000

            if (now - iat >= ttlMs) {
                await User.findByIdAndDelete(userId)
                console.info(`🧹 Usuario anónimo con ID ${userId} eliminado por expiración`)
            }
        }

        // En cualquier caso, dejamos continuar
        next()
    } catch (error) {
        console.warn('⚠️ Token inválido o expirado en cleanup middleware (ignorado en login)')
        // No bloqueamos, simplemente seguimos
        next()
    }
}
