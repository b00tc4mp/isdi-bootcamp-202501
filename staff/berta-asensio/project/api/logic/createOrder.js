import { User, Menu, Order } from '../data/index.js'
import { errors, validate } from 'com'  

const { NotFoundError, SystemError } = errors


export const createOrder = (userId, menuId, bread /*note*/) => {
    validate.id(userId, 'userId')
    validate.id(menuId, 'menuId')
    validate.string(bread, 'bread')
    validate.maxLength(bread, 50, 'bread')
    //validate.string(note, 'note')
    //validate.maxLength(note, 200, 'note')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Menu.findById(menuId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(menu => {
                    if (!menu) throw new NotFoundError('menu not found')
                    if (!menu.breadOptions.includes(bread)) throw new Error('Invalid bread type')

                    return Order.create({ 
                        user: userId, 
                        menu: menuId, 
                        bread,
                        /*note*/ })
                        .catch(error => { throw new SystemError(error.message) })

                })
        })
        .then(() => {})
}