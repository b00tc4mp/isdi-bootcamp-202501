import { data } from '../../data/index.js'
import { extractPayloadFromJWT } from '../../util/extractPayloadFromJWT.js'
import { errors } from '../../validations/index.js'

const { SystemError} = errors

export const getUserRole = () => {
 return data.token
     .then(token => {
       if (!token) throw new SystemError('Token not found')
 
       // Decodificar el token para obtener el userId
       const { role } = extractPayloadFromJWT(token)
       return role
     })
     .catch(error => {
       throw new SystemError(error.message)
     })
}
