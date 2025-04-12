import { data } from '../../data'

import { errors, validate } from '../../validations/index.js'

const { SystemError, ValidationError } = errors

export const setGameWinner = (gameId, winnerUsername) => {
  validate.id(gameId, 'gameId')
  validate.username(winnerUsername, 'winnerUsername')

  return data.token
    .then(token => {
      if (!token) throw new ValidationError('Token not found')

      return fetch(`http://localhost:8080/games/${gameId}/winner`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ winnerUsername }),
      })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
      if (response.status === 204) return
      return response.json().then(body => { throw new SystemError(body.message) })
    })
}