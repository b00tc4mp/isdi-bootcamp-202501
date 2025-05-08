import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserName } from './getUserName.js'

import { getMenus } from './getMenus.js'
import { getMenusByCategory } from './getMenusByCategory.js'

export const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    getMenus,
    getMenusByCategory
}