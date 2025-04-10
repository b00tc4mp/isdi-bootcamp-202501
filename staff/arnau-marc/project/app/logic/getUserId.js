import { data } from '../data'
import { extractPayloadFromJWT } from '../util'

export const getUserId = () => {
  return data.token
    .then(token => {
      if (!token) throw new Error('Token not found')

      // Decodificar el token para obtener el userId
      const { sub: userId } = extractPayloadFromJWT(token)
      return userId
    })
    .catch(error => {
      throw new Error(error.message)
    })
}
