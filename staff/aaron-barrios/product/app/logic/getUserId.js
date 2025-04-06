import {extractPayloadFromJWT} from '../utils/index.js'

export const getUserId = () => {
    if (!sessionStorage.token) return null

    const { sub:userId } = extractPayloadFromJWT(sessionStorage.token)

    return userId
}