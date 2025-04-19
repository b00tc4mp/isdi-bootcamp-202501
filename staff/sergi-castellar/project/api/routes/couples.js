import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js'

export const couples = Router()

couples.get('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getOwnCouple(userId)
        .then(couple => res.json({ couple }))
}))

couples.get('/info', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getCoupleInfo(userId)
        .then(status => res.json({ status }))
}))

couples.get('/events', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { startDate, endDate } = req.query

    return logic.getCoupleEvents(userId, new Date(startDate), new Date(endDate))
        .then(events => res.json({ events }))
}))

couples.get('/invite', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getInviteCode(userId)
        .then(inviteCode => res.json({ inviteCode }))
}))

couples.post('/join', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { code } = req.body

    return logic.joinWithInviteCode(userId, code)
        .then(couple => res.json({ couple }))
}))

couples.patch('/date-start', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { dateStart } = req.body

    return logic.setCoupleStartDate(userId, new Date(dateStart))
        .then(() => res.status(204).send())
}))