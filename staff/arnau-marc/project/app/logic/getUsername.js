import { data } from '../data/index.js'
// TODO IMPORT ERRORS

export const getUsername = () => {
    const { token } = data
    
    return fetch ('http://localhost:8080/users/self/username', {
        method: 'GET',
        headers: {
            Authorization : `Bearer ${ token }`
        }
    })
        .catch(error => { throw new Error(error.message)})
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new Error(error.message)})
                    .then(body => {
                        const { username } = body

                        return username
                    })
            return response.json()
                    .catch(error => { throw new Error(error.message)})
                    .then(body => {
                        const{ error, message } = body

                        throw new Error(error.message)
                    })
        })
}