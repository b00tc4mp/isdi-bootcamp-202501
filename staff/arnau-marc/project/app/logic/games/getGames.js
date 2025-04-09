// app/logic/getGames.js
import { data } from '../../data'

export const getGames = () => {
  return data.token
    .then(token => {
      if (!token) throw new Error('Token not found')

      return fetch('http://localhost:8080/games', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
    .catch(error => {
      throw new Error(error.message)
    })
    .then(response => {
      if (response.status === 200) {
        return response.json()
          .catch(error => { throw new Error(error.message) })
      }

      return response.json()
        .catch(error => { throw new Error(error.message) })
        .then(body => {
          const { error, message } = body
          throw new Error(message)
        })
    })
}
