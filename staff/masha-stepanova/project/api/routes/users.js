import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { logic } from '../logic/index.js'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

const { JWT_SECRET } = process.env

export const users = Router()

users.post(
  '/',
  jsonBodyParser,
  withErrorHandling((req, res) => {
    const { name, email, username, password, repeatedPassword } = req.body

    return logic.registerUser(name, email, username, password, repeatedPassword).then(() => res.status(201).send())
  })
)

users.post(
  '/auth',
  jsonBodyParser,
  withErrorHandling((req, res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password).then((id) => {
      const token = jwt.sign({ sub: id }, JWT_SECRET)

      res.json({ token })
    })
  })
)

users.get(
  '/self/username',
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserUsername(userId).then((username) => res.json({ username }))
  })
)

users.patch(
  '/:levelId',
  authHandler,
  jsonBodyParser,
  withErrorHandling((req, res) => {
    const {
      userId,
      params: { levelId },
    } = req

    const { userAnswer } = req.body

    return logic.isLevelPassed(userId, levelId, userAnswer).then((isPassed) => res.json(isPassed))
  })
)

users.get(
  '/ranking/self',
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserRanking(userId).then((position) => res.json(position))
  })
)

users.get(
  '/ranking',
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getGlobalRanking(userId).then((ranking) => res.json(ranking))
  })
)

users.get(
  '/self',
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUser(userId).then((user) => res.json(user))
  })
)
