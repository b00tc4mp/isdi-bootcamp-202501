import { loginUser } from './loginUser.js'
import { registerUser } from './registerUser.js'
import { isUserLoggedIn } from './isUserLoggedIn.js'
import { addClothingItem } from './addClothingItem.js'
import { getUserUsername } from './getUserUsername.js'
import { logoutUser } from './logoutUser.js'
import { getUserClothingItems } from './getUserClothingItems.js'
import { updateClothingItem } from './updateClothingItem.js'
import { deleteClothingItem } from './deleteClothingItem.js'

export const logic = {
    loginUser,
    registerUser,
    isUserLoggedIn,
    logoutUser,
    getUserUsername,
    addClothingItem,
    getUserClothingItems,
    updateClothingItem,
    deleteClothingItem
}