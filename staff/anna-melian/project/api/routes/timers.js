import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

export const timers = Router()

timers.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    const { time, pauseTime, tag } = req.body

    return logic.createTimer(userId, time, pauseTime, tag)
        .then((newTimerId) => res.status(201).json({ id: newTimerId }))
}))

timers.patch('/:timerId/start', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { timerId } = req.params

    return logic.startTimer(userId, timerId)
        .then(() => res.status(204).send())
}))

timers.patch('/:timerId/end', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { timerId } = req.params

    return logic.endTimer(userId, timerId)
        .then(() => res.status(204).send())
}))

timers.patch('/:timerId/pause', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { timerId } = req.params

    return logic.pauseTimer(userId, timerId)
        .then(() => res.status(204).send())
}))

timers.patch('/:timerId/exit', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { timerId } = req.params

    return logic.exitTimer(userId, timerId)
        .then(() => res.status(204).send())
}))

timers.patch('/:timerId/resume', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { timerId } = req.params

    return logic.resumeTimer(userId, timerId)
        .then(() => res.status(204).send())
}))

timers.patch('/:timerId/extraTime', jsonBodyParser, authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { timerId } = req.params

    const { timeExtra } = req.body

    return logic.setAndStartExtraTime(userId, timerId, timeExtra)
        .then(() => res.status(204).send())
}))

timers.get('/:timerId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { timerId } = req.params

    return logic.getTimer(userId, timerId)
        .then(timer => res.json(timer))
}))

timers.delete('/:timerId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { timerId } = req.params

    return logic.deleteTimer(userId, timerId)
        .then(() => res.status(204).send())
}))