import { Router } from 'express'
import { authHandler, jsonBodyParser, withErrorHandling } from '../handlers/index.js'
import { logic } from '../logic/index.js'

export const lookSuggestions = Router()

lookSuggestions.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { requestId, look, notes } = req.body
    const { userId } = req

    return logic.saveLookSuggestion(userId, requestId, look, notes)
        .then(() => res.status(201).send())
}))

lookSuggestions.get('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getSavedLooks(userId)
        .then(looks => res.json(looks))
}))