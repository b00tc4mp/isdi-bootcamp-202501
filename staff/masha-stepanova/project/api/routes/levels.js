import { Router } from 'express'

import { logic } from '../logic/index.js'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

export const levels = Router()

levels.get(
  '/',
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getLevels(userId).then((levels) => res.json(levels))
  })
)

levels.get(
  '/current',
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getCurrentLevel(userId).then((level) => res.json(level))
  })
)

levels.get(
  '/:levelId',
  authHandler,
  withErrorHandling((req, res) => {
    const {
      userId,
      params: { levelId },
    } = req

    return logic.getLevel(userId, levelId).then((level) => res.json({ level }))
  })
)
