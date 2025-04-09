import { data } from '../data/index.js'

export const isUserLoggedIn = () => {
    !!data.userId
}