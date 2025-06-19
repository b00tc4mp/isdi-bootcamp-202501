import { Menu } from '../data/index.js'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export const getMenuById = (menuId) => {

    return Menu.findById(menuId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(menu => {
            if(!menu) throw new NotFoundError(`Menu with ${menuId} id not found`)
            
            return menu
        })
}

//TODO getMenuById tests