import { Menu } from '../data/index.js'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export const getMenus = () => {

    return Menu.find().sort({ ordinal: 1 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(menus => {
            if(!menus || menus.length === 0) { throw new NotFoundError('menus not found') }

            return menus.map(menu => {
                menu.id = menu._id.toString()
                delete menu._id
                return menu
            })
        })
}