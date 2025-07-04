import { Menu } from '../data/index.js'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export const getMenusByCategory = (categories) => {

    // Construir el filtro MongoDB
    const filter = {
        categories: { $in: categories }
    }

    return Menu.find(filter).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(menus => {
            if (!menus || menus.length === 0)
                throw new NotFoundError('No menus found in this category')

            return menus.map(menu => {
                menu.id = menu._id.toString()
                delete menu._id
                return menu
            })
        })
}