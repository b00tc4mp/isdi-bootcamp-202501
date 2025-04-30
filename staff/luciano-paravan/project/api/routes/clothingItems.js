import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js'

export const clothingItems = Router()

clothingItems.post('/', jsonBodyParser, authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { itemName, category, type, color, season, occasion } = req.body

    return logic.addClothingItem(userId, itemName, category, type, color, season, occasion)
        .then(() => res.status(201).json())
}))

clothingItems.patch('/:clothingItemId', jsonBodyParser, authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { clothingItemId } = req.params
    const updateData = req.body

    return logic.updateClothingItem(userId, clothingItemId, updateData)
        .then(() => res.status(204).send())
}))