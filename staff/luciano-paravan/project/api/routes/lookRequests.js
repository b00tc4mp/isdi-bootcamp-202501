import { Router } from 'express'
import { authHandler, jsonBodyParser, withErrorHandling } from '../handlers/index.js'
import { logic } from '../logic/index.js'

export const lookRequests = Router()

lookRequests.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { contextOccasion, location, temperature, timeOfDay, style, additionalDetails, allowExternalSuggestions } = req.body
    const { userId } = req

    return logic.lookRequest(userId, contextOccasion, location, temperature, timeOfDay, style, additionalDetails, allowExternalSuggestions)
        .then(result => res.json(result))
}))