import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js'

export const couples = Router()

couples.get('/self', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getOwnCouple(userId)
        .then(couple => res.json({ couple }))
}))

couples.get('/self/info', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getCoupleInfo(userId)
        .then(status => res.json({ status }))
}))

couples.get('/self/events', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { startDate, endDate } = req.query

    return logic.getCoupleEvents(userId, new Date(startDate), new Date(endDate))
        .then(events => res.json({ events }))
}))

couples.post('/', withErrorHandling((req, res) => {
    //TODO
    return logic.createCouple
}))


// get('/couple/self/events', authHandler, withErrorHandling((req, res) => {
//     const { userId } = req

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'End and start dates needed' })
//     }

//     try {
//         return getEventsForCouple(coupleId, new Date(startDate), new Date(endDate))
//         .then() res.status(200).json(events)
//     } catch (err) {
//         return res.status(500).json({ error: 'Hubo un error al obtener los eventos' })
//     }
// }))

// couples.post('/', jsonBodyParser, withErrorHandling((req, res) => {
//     // const { userId1, userId2 } = req.body

//     return logic.createCouple(userId1, userId2)
//         .then(() => res.status(201).send())
// }))