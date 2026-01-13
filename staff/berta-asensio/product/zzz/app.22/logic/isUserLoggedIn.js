import { data } from '../data/index.js'

/* Lo hacemos más corto
export const isUserLoggedIn = () => {
        return !!data.userId
}
*/
export const isUserLoggedIn = () => !!data.userId