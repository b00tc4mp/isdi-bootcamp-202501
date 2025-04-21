import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, retrieveUserId } from '../middleware/index.js'
import { logic } from '../logic/index.js'

export const couples = Router()

couples.get('/', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getOwnCouple(userId)
        .then(couple => res.json({ couple }))
}))

couples.get('/info', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getCoupleInfo(userId)
        .then(status => res.json({ status }))
}))

couples.get('/invite', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getInviteCode(userId)
        .then(inviteCode => res.json({ inviteCode }))
}))

couples.post('/join', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { inviteCode } = req.body

    return logic.joinWithInviteCode(userId, inviteCode)
        .then(couple => res.json({ couple }))
}))

couples.patch('/date-start', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { dateStart } = req.body

    return logic.setCoupleStartDate(userId, new Date(dateStart))
        .then(() => res.status(204).send())
}))

//CALENDAR EVENTS

couples.get('/events', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req
    const { startDate, endDate } = req.query

    return logic.retrieveCalendarEvents(userId, new Date(startDate), new Date(endDate))
        .then(events => res.json({ events }))
}))

couples.post('/events', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { eventDate, title, description } = req.body

    return logic.createCalendarEvent(userId, new Date(eventDate), title, description)
        .then(event => res.status(201).json(event))
}))

couples.put('/events/:eventId', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { eventId } = req.params
    const { title, description } = req.body

    return logic.updateCalendarEvent(userId, eventId, title, description)
        .then(() => res.status(204).send())
}))

couples.delete('/events/:eventId', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req
    const { eventId } = req.params

    return logic.deleteCalendarEvent(userId, eventId)
        .then(() => res.status(204).send())
}))


//LISTS

couples.get('/lists', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.retrieveLists(userId)
        .then(lists => res.json(lists))
}))

couples.get('/lists/:listId/items', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req
    const { listId } = req.params

    return logic.retrieveItems(userId, listId)
        .then(items => res.json(items))
}))

couples.post('/lists', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { title, color } = req.body

    return logic.createList(userId, title, color)
        .then(list => res.status(201).json(list))
}))

couples.post('/lists/:listId/items', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { listId } = req.params
    const { text } = req.body

    return logic.createItem(userId, listId, text)
        .then(item => res.status(201).json(item))
}))

couples.put('/lists/:listId', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { listId } = req.params
    const { title, color } = req.body

    return logic.updateList(userId, listId, title, color)
        .then(() => res.status(204).send())
}))

couples.put('/items/:itemId', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { itemId } = req.params
    const { text } = req.body

    return logic.updateItem(userId, itemId, text)
        .then(() => res.status(204).send())
}))

couples.delete('/lists/:listId', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req
    const { listId } = req.params

    return logic.deleteList(userId, listId)
        .then(() => res.status(204).send())
}))

couples.delete('/items/:itemId', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req
    const { itemId } = req.params

    return logic.deleteItem(userId, itemId)
        .then(() => res.status(204).send())
}))

// EMOTIONS

couples.get('/emotions', retrieveUserId, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.retrieveTodayEmotions(userId)
        .then(emotions => res.json(emotions))
}))

couples.post('/emotions', retrieveUserId, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { emotion } = req.body

    return logic.createEmotion(userId, emotion)
        .then(() => res.status(201).send())
}))