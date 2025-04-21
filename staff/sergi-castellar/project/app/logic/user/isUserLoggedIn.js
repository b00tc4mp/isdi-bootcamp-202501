import { data } from '../../data/index'

export const isUserLoggedIn = () => {
    return !!data.token
}