import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { getUserName } from './getUserName'
import { logoutUser } from './logoutUser'

import { getMenus } from './getMenus'
import { getMenusByCategory } from './getMenusByCategory'

import { createOrder } from './createOrder'


export const logic = {
    registerUser,
    loginUser,
    getUserName,
    logoutUser,

    getMenus,
    getMenusByCategory,

    createOrder
}