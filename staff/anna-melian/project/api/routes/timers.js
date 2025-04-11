import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

export const timers = Router()

timers.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    const { time, tag } = req.body

    return logic.createPost(userId, time, tag)
        .then(() => res.status(201).send())
}))