import { data } from '../data/index.js';
import { validate } from 'com'

export const getUserById = (userId) => {
    validate.id(userId, 'id')

    let userFound = data.users.getById(userId);
    userFound ? userFound = userFound : userFound = null;

    return userFound;
};
