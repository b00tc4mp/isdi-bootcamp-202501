// OBTENER EL NOMBRE DE USUARIO

import { data } from '../data/index.js'

import { errors, validate } from 'com'

const { NotFoundError } = errors


// Funcion para Obtener nombre de usuario
export const getUserName = (userId) => {
    validate.id(userId, 'userId')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    return user.name  //**** */
}