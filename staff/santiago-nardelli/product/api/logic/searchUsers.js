import {User} from '../models/user.js';
import {errors, validate} from 'com';


const {NotFoundError, SystemError} = errors;

export const searchUsers = (query) => {
    validate.string(query, 'query'); // Validar que el nombre sea una cadena válida

    return User
        .find({name: {$regex: query, $options: 'i'}}) // Buscar un usuario cuyo nombre coincida
        .then((users) => {
            if (!users.length) throw new NotFoundError('user not found'); // Lanzar error si no se encuentra el usuario

            return users.map(user => ({id: user._id.toString(), name: user.name})); // Devolver el ID del usuario
        })
        .catch((error) => {
            throw new SystemError('database error', error.message); // Manejar errores de la base de datos
        });
}
