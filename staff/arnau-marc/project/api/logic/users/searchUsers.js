import { User } from '../../data/index.js' // Importamos el modelo de Usuario
import { errors } from '../../validations/index.js'

const { NotFoundError } = errors

export const searchUsers = (query) => {
    // Buscamos usuarios cuyo 'username' contenga el texto introducido en el query

    return User.find({ username: { $regex: query, $options: 'i' } }) // 'i' para que sea insensible a mayúsculas/minúsculas
        .select('username') // Solo seleccionamos el campo 'username'
        .lean() // Para devolver un objeto simple (sin métodos de Mongoose)
        .then(users => {
            if (users.length === 0) {
                throw new NotFoundError('No users found')
            }
            return users // Devolvemos los usuarios encontrados
        })
};
