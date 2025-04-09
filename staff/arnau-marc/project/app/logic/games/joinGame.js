export const joinEvent = (eventId) => {
    return fetch(`http://localhost:8080/events/${eventId}/join`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      if (!res.ok) throw new Error('Could not join event')
      return res.json()
    })
  }