import { data } from '../../data/index.js'
// import errors, validate

export const deleteGame = (gameId) => {
    // validate

    return data.token
        .then(token => {
            if (!token) throw new Error(error.message)
            
            return fetch(`http://localhost:8080/games/${gameId}`, {
                method: 'DELETE',
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        })
        .catch(error => { throw new Error(error.message) })
        .then(response => { 
            console.log(response.status)

            if (response.status === 204) return

            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}