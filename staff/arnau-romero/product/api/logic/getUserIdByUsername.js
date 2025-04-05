// logic/searchUser.js

import { User } from '../data/index.js'  // Asegúrate de importar el modelo User
import { errors } from '../../com/index.js'; // Si usas un error personalizado

const { NotFoundError} = errors

// Lógica para buscar un usuario por username


export const getUserIdByUsername = (username) => {
    // Validamos si el 'username' está presente
    if (!username) {
        throw new NotFoundError('Username is required');
    }

    // Buscamos al usuario por su 'username'
    return User.findOne({ username })
        .then(user => {
            // Si el usuario no existe, lanzamos un error
            if (!user) {
                throw new Error('User not found');
            }
            // Retornamos el ID del usuario encontrado
            return user._id.toString();
        });
};