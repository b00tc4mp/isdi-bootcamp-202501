import { ClothingItem } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, DuplicityError } = errors

export const addClothingItem = (userId, itemName, category, type, color, season, occasion) => {
    validate.id(userId)
    validate.name(itemName)
    validate.category(category)
    validate.string(type)
    validate.minLength(type, 2, 'type')
    validate.maxLength(type, 20, 'type')
    validate.string(color)
    validate.minLength(color, 2, 'color')
    validate.maxLength(color, 20, 'color')
    validate.season(season)
    validate.occasion(occasion)

    return ClothingItem.findOne({ itemName, owner: userId })
        .catch(error => { throw new SystemError(error.message) })
        .then(item => {
            if (item) throw new DuplicityError('item already exists')

            const newClothingItem = {
                owner: userId,
                itemName,
                category,
                type,
                color,
                season,
                occasion
            }

            return ClothingItem.create(newClothingItem)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}