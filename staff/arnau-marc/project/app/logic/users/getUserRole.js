import { data } from '../../data/index.js'

import { errors } from '../../validations/index.js'

const { SystemError, AuthorizationError } = errors

export const getUserRole = () => {
  return data.token
    .then(token => {
      if (!token) throw new AuthorizationError('Token not found')

      return fetch('http://localhost:8080/users/self/role', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        return response.json().then(body => {
          const { message } = body
          throw new SystemError(message)
        })
      }
    })
    .then(body => {
      const { role } = body
      return role
    })
    .catch(error => {
      throw new SystemError(error.message)
    })
}
