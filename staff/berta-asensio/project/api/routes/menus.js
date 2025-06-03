import { Router } from 'express'

import { authHandler, withErrorHandling } from '../handlers/index.js'

import { logic } from '../logic/index.js'

export const menus = Router()

//Ruta para traer los menús
menus.get('/', authHandler, withErrorHandling((req, res) => {

    return logic.getMenus()
        .then(menus => res.json(menus))
}))

//Ruta para traer menús filtrados por categorias
menus.get('/:categories', authHandler, withErrorHandling((req, res) => {
    const { categories } = req.params

    return logic.getMenusByCategory(categories)
        .then(menus => res.json(menus))
}))