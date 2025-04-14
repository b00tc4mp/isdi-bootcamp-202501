import { data } from '../../data/index.js'
import { errors } from '../../validations/index.js'

const { SystemError } = errors

export const getSeasonById = (seasonId) => {
  return data.token
  .then(() => {
    return fetch(`http://localhost:8080/seasons/${seasonId}`, {
        headers: {
          'Authorization': `Bearer ${data.token}`
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
