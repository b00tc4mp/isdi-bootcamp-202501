import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { jsonBodyParser, withErrorHandling, authHandler } from '../middlewares/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env 

export const games = Router()

games.patch('/:gameId/participation', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { gameId } = req.params

    return logic.toggleParticipation(userId, gameId)
        .then(() => res.status(204).send())
}))