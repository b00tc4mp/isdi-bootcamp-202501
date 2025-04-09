import { data } from '../../data'

export const createGame = (title, date, place, season) => {
  return data.token
    .then(token => {
      if (!token) throw new Error('No token found')

      return fetch('http://localhost:8080/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, date, place, season }),
      })
    })
    .catch(error => {
      throw new Error(error.message)
    })
    .then(response => {
      if (response.status === 201) return

      return response.json()
        .catch(error => { throw new Error(error.message) })
        .then(body => {
          const { message } = body
          throw new Error(message)
        })
    })
}