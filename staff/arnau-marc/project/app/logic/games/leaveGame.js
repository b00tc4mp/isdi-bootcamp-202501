export const leaveEvent = (eventId) => {
    return fetch(`http://localhost:8080/events/${eventId}/leave`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      if (!res.ok) throw new Error('Could not leave event')
      return res.json()
    })
  }