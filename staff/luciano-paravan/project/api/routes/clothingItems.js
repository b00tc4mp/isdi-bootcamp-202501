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
    const { itemName, category, type, color, season, occasion } = req.body

    return logic.updateClothingItem(userId, clothingItemId, itemName, category, type, color, season, occasion)
        .then(() => res.status(204).send())
}))

clothingItems.delete('/:clothingItemId', jsonBodyParser, authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { clothingItemId } = req.params

    return logic.deleteClothingItem(userId, clothingItemId)
        .then(() => res.status(204).send())
}))