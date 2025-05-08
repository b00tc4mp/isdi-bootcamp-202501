import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserUsername } from './getUserUsername.js'
import { addClothingItem } from './addClothingItem.js'
import { getUserClothingItems } from './getUserClothingItems.js'
import { updateClothingItem } from './updateClothingItem.js'
import { deleteClothingItem } from './deleteClothingItem.js'
import { lookRequest } from './lookRequest.js'

export const logic = {
    registerUser,
    authenticateUser,
    getUserUsername,
    addClothingItem,
    getUserClothingItems,
    updateClothingItem,
    deleteClothingItem,
    lookRequest
}