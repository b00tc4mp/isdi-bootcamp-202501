import { User, ClothingItem } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export const updateClothingItem = (userId, clothingItemId, itemName, category, type, color, season, occasion) => {
    validate.id(userId, 'user id')
    validate.id(clothingItemId, 'clothing item id')
    validate.text(itemName, 'item name')
    validate.category(category)
    validate.text(type, 'type')
    validate.text(color, 'color')
    validate.season(season)
    validate.occasion(occasion)

    return Promise.all([
        User.findById(userId).lean(),
        ClothingItem.findById(clothingItemId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, clothingItem]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!clothingItem) throw new NotFoundError('clothing item not found')

            if (clothingItem.owner.toString() !== userId) throw new OwnershipError('user is not the owner of the clothing item')

            const updateData = {
                itemName,
                category,
                type,
                color,
                season,
                occasion
            }

            return ClothingItem.updateOne({ _id: clothingItemId }, updateData)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}