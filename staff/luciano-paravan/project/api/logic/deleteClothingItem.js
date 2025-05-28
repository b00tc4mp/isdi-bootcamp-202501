import { User, ClothingItem } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export const deleteClothingItem = (userId, clothingItemId) => {
    validate.id(userId, 'user id')
    validate.id(clothingItemId, 'clothing item id')

    return Promise.all([
        User.findById(userId).lean(),
        ClothingItem.findById(clothingItemId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, clothingItem]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!clothingItem) throw new NotFoundError('clothing item not found')

            if (!clothingItem.owner || clothingItem.owner.toString() !== userId)
                throw new OwnershipError('user is not owner of the clothing item')

            return ClothingItem.deleteOne({ _id: clothingItemId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}