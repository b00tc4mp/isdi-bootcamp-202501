export const setGameWinner = (eventId, winnerId) => {
    return fetch(`http://localhost:8080/events/${eventId}/winner`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ winnerId })
    }).then(res => {
      if (!res.ok) throw new Error('Could not set winner')
      return res.json()
    })
  }