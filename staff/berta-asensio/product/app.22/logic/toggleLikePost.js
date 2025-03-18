import { data } from '../data/index.js'
import { validate } from './validate.js'


//import { NotFoundError } from '../errors.js'


export const toggleLikePost = (postId) => {
    validate.id(postId, 'postId')

    const { userId } = data

    return fetch(`http://localhost:8080/posts/${postId}/likes`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${userId}`
        }
    })
        .catch(error => { throw new Error (error.message) }) //si falla conexión o servidor
        .then(response => { //happy path
            console.log(response.status) //se imprime en consola el codigo de estado de la respuesta

            if(response.status === 204)
                return  //respuesta super happy path, no devolvemos nada. Todo ok.

            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })  
}
