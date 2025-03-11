import { data } from './../data/index';

export const getCurrentUser = () => {
    const userFound = data.users.findOne(user => user.id === data.userId);
    let result;
    userFound ? result = userFound : result = null;
    return result;
};
