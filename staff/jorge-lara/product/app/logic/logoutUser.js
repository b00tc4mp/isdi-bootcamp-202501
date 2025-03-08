import { data } from '../data/index.js'

export const logoutUser = () => {
    data.userId = null;
}