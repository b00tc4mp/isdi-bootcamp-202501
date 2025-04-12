import { data } from '../../data'
import { validate, errors } from '../../validations/index.js'

const { SystemError } = errors

export const getUserById = (userId) => {
  return data.token
    .then((token) => { 
        return fetch(`http://localhost:8080/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
    }) 
    .catch(err => { throw new SystemError(err.message) })
    .then(res => {
      if (res.status === 200)
        return res.json()

      return res.json()
        .then(body => {
          throw new SystemError(body.message)
        })
    })
}
