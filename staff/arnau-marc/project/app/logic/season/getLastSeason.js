import { data } from '../../data'
import { SystemError } from '../../validations/index.js'

export const getLatestSeason = () => {
  return data.token
  .then((token) => {
    if (!token) throw new Error('No token found')

    return fetch('http://localhost:8080/seasons/latest', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }) 
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
      if (res.status === 200)
        return res.json()
          .catch(error => { throw new SystemError(error.message) })

      return res.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { message } = body
          throw new SystemError(message)
        })
    })
}
