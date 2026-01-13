import { data } from './../data/index.js';

export const getLikesUsernames = (likeIds) => {
    return likeIds.map(likeId => {
        const user = data.users.getById(likeId);
        return user.username;
    });
};
