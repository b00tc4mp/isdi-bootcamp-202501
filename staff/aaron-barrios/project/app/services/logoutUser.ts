import { data } from '../data'

const logoutUser = () => {
    data.removeToken()
}

export default logoutUser