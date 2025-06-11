import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserName } from './getUserName.js'
import { addUserCredit } from './addUserCredit.js'
import { getUserCredit } from './getUserCredit.js'

import { getMenus } from './getMenus.js'
import { getMenusByCategory } from './getMenusByCategory.js'

import { createOrder } from './createOrder.js'
import { getOrdersByUser } from './getOrdersByUser.js'
import { deleteOrder } from './deleteOrder.js'


export const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    addUserCredit,
    getUserCredit,

    getMenus,
    getMenusByCategory,

    createOrder,
    getOrdersByUser,
    deleteOrder
}