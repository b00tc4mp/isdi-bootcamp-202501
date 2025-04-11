import { data } from '../../data'


export const setGameWinner = (gameId, winnerUsername) => {
  return data.token
    .then(token => {
      return fetch(`http://localhost:8080/games/${gameId}/winner`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ winnerUsername }),
      })
    })
    .catch(error => { throw new Error(error.message) })
    .then(response => {
      if (response.status === 204) return
      return response.json().then(body => { throw new Error(body.message) })
    })
}