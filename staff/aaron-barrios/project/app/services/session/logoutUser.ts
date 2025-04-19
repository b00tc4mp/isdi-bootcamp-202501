import { data } from '../../data'
import { errors } from 'com'

const { SystemError } = errors

const logoutUser = async (): Promise<void> => {
    try {
        await data.removeToken()
    } catch (error) {
        throw new SystemError((error as Error).message)
    }
}

export default logoutUser