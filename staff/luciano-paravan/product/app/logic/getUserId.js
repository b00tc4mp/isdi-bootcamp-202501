import { extractPayloadFromJWT } from '../util'

export const getUSerId = () => {
    if (!sessionStorage.token) return null

    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return userId
}