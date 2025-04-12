import { data } from '../../data'
import { errors, validate } from '../../validations/index.js'

const { SystemError, AuthorizationError } = errors

export const createGame = (title, season, date, place) => {
  validate.title(title, 'title')
  validate.season(season, 'season')
  validate.place(place, 'place')

  return data.token
    .then(token => {
      if (!token) throw new AuthorizationError('No token found')

      return fetch('http://localhost:8080/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, season, date, place}),
      })
    })
    .catch(error => {
      throw new SystemError(error.message)
    })
    .then(response => {
      if (response.status === 201) return

      return response.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { message } = body
          throw new SystemError(message)
        })
    })
}