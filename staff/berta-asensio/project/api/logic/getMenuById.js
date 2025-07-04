import { Menu } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getMenuById = (menuId) => {
    validate.id(menuId)

    return Menu.findById(menuId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(menu => {
            if(!menu) throw new NotFoundError(`Menu with ${menuId} id not found`)

            menu.id = menu._id.toString()
            delete menu._id
            
            return menu
        })
}
