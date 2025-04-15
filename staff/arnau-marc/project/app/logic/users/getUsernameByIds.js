import { data } from '../../data'
import { errors } from '../../validations/index.js'

const { SystemError } = errors

export const getUsernamesByIds = (ids) => {
  if (!Array.isArray(ids)) throw new SystemError('ids must be an array')

  return data.token
    .then(token =>
      fetch('http://localhost:8080/users/usernames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
      })
    )
    .catch(err => { throw new SystemError(err.message) })
    .then(res => {
      if (res.status === 200) return res.json()

      return res.json()
        .then(body => { throw new SystemError(body.message) })
    })
    .then(({ usernames }) => usernames)
}
