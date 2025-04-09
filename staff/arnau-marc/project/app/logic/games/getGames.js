export const getEvents = () => {
    return fetch('http://localhost:8080/events', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
  }