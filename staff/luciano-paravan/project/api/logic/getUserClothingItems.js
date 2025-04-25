import { SystemError } from 'com/errors.js'
import { User, ClothingItem } from '../data/index.js'
import { errors, validate } from 'com'
import { clothingItems } from '../routes/clothingItems.js'

const { NotFoundError } = errors

export const getUserClothingItems = (userId) => {
    validate.id(userId)

    return Promise.all([
        User.findById(userId).lean(),
        ClothingItem.find({ owner: userId }).select('-__v').sort('-createdAt').populate('owner', 'username').lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, clothingItems]) => {
            if (!user) throw new NotFoundError('user not found')

            clothingItems.forEach(item => {
                item.id = item._id.toString()
                delete item._id

                if (item.owner._id) {
                    item.owner.id = item.owner._id.toString()
                    delete item.owner._id
                }
            })

            return clothingItems
        })
}