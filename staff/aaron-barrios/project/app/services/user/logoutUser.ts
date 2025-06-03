import { data } from '../../data'
import { errors } from 'com'

const { SystemError } = errors

const logoutUser = async (): Promise<void> => {
    try {
        const current = await data.getToken()
        console.log("🔴 Token antes del logout:", current)

        await data.removeToken()

        const after = await data.getToken()
        console.log("⚪ Token después del logout:", after)
    } catch (error) {
        throw new SystemError((error as Error).message)
    }
}

export default logoutUser