import { data } from '../data/index.js'

//import { NotFoundError } from '../errors.js'

//esta funcion se usa en homepage, asi que pasamos then catch por ahi
export const getUserName = () => {
        const { userId } = data 

        return fetch ('http://localhost:8080/users/self/name', {
                method: 'GET',
                headers: {
                        Authorization: `Basic ${userId}`
                }
        })
                .catch(error => { throw new Error(error.message) })
                .then(response => {
                        console.log(response.status)

                        if(response.status === 200)
                                return response.json()  //si todo va bien convertimos la respuesta a json
                                        .catch(error => { throw new Error(error.message) })
                                        .then(body => {
                                              const { name } = body  
                                              
                                              return name
                                        })
                
                        return response.json()
                                .catch(error => { throw new Error(error.message) })
                                .then(body => {
                                        const { error, message } = body

                                        throw new Error(message)
                                })     
                })
}
