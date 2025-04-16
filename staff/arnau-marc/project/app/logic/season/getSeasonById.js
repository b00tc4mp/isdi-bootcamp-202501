import { data } from '../../data/index.js'
import { errors } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError } = errors

export const getSeasonById = (seasonId) => {
  return data.token
  .then(() => {
    return fetch(`${API_BASE_URL}/seasons/${seasonId}`, {
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
