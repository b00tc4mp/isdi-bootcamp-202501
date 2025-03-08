import { data } from '../data/index.js'

export const getLoggedUser = () => {
    const users = data.users.getAll();

    const { userId } = data;

    const found = data.users.getById(userId);

    if (!found) {
        throw new Error('user not found');
    }

    return found.name
}