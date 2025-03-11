import { data } from './../data/index';

export const getLikesUsernames = (likeIds) => {
    return likeIds.map(likeId => {
        const user = data.users.findOne(user => user.id === likeId);
        return user.username;
    });
};
