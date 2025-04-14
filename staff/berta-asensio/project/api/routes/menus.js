import { Router } from 'express'

import { authHandler, withErrorHandling } from '../handlers/index.js'

import { logic } from '../logic/index.js'

export const menus = Router()

//Ruta para traer los menús
menus.get('/menus', authHandler, withErrorHandling((req, res) => {

    return logic.getMenus()
        .then(menus => res.json(menus))
}))