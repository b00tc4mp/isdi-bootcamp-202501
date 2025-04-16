import { data } from '../../data/index.js'
import { SystemError } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

export const createSeason = ({ name, startDate, endDate }) => {
  return data.token
.then((token) => {
    if (!token) throw new Error('No token found')

      return fetch(`${API_BASE_URL}/seasons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, startDate, endDate })
      })
 })
    .catch(err => { throw new SystemError(err.message) })
    .then(res => {
      if (res.status === 201) return
      return res.json()
        .then(body => {
          throw new SystemError(body.message)
        })
    })
}
