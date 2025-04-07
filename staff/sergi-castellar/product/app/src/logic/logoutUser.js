import { data } from './../data/index';

export const logoutUser = () => {
    data.token = null;
};
