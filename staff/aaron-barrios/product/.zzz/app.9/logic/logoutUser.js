import {data} from '../data/index.js'

export const logoutUser = () => {
        data.userId = null
        // data.currentUser.state = 'Offline'
        // data.currentUser = null
    }