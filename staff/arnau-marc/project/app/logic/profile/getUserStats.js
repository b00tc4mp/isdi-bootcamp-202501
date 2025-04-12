import { data } from '../../data/index.js'
import { errors } from '../../validations/index.js'

const { SystemError, AuthorizationError } = errors

export const getUserStats = () => {
  return data.token
    .then(token => {
      if (!token) throw new AuthorizationError('Token not found')

      return fetch('http://localhost:8080/profiles/stats', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
      if (response.status === 200) return response.json()

      return response.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { error, message } = body
          const constructor = errors[error]
          throw new constructor(message)
        })
    })
}
