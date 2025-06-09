import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { getUserName } from './getUserName'
import { logoutUser } from './logoutUser'
import { getUserId } from './getUserId'

import { getMenus } from './getMenus'
import { getMenusByCategory } from './getMenusByCategory'

import { createOrder } from './createOrder'
import { getOrdersByUser } from './getOrdersByUser'
import { deleteOrder } from './deleteOrder'


export const logic = {
    registerUser,
    loginUser,
    getUserName,
    logoutUser,
    getUserId,

    getMenus,
    getMenusByCategory,

    createOrder,
    getOrdersByUser,
    deleteOrder
}