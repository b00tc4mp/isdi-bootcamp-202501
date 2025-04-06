import { data } from '../data/index.js'

export const logoutUser = () => {
    data.token = null
    // data.currentUser.state = 'Offline'
    // data.currentUser = null
}