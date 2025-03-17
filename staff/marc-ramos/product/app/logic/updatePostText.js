import { data } from '../data/index.js'
import { validate } from './validate.js'

// import { NotFoundError, OwnershipError } from '../errors.js'

export const updatePostText = (postId, text) => { // edit post text
    validate.id(postId, 'postId') // validamos el post id

    const {userId} = data // traemos userId de data

    return fetch(`http://localhost:8080/posts/${postId}/text`, { //  
        method: 'PATCH', // el metodo patch se usa para cambiar parcialmente una parte
        headers: {
            Authorization: `Basic ${userId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
    .catch(error => { throw new Error(error.message) })
    .then(response => {
        console.log(response.status)

        if (response.status === 204)
            return

        return response.json() // si no va bien, convertimos a json
            .catch(error => { throw new Error(error.message) }) // si convertir a JSON falla, lanzamos un error con el mensaje
            .then(body => {
                const { error, message } = body

                throw new Error(message)
            })
    })
}