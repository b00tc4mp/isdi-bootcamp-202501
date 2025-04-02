// OBTENER EL NOMBRE DE USUARIO

import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError } = errors

// Funcion para Obtener nombre de usuario
export const getUserName = userId => {
    validate.id(userId, 'userId')

    // Busca y devuelve un usuario en data.users cuyo _id coincida con userId, lo convirte en ObjectId para MongoDB
    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // Retornamos el nombre de usuario
            return user.name

        })

}