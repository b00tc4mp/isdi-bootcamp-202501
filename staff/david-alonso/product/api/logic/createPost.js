import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

// Funcion para añadir un Posts nuevo
export const createPost = (userId, image, text) => {
    validate.id(userId)
    validate.url(image)
    validate.maxLength(image, 500, 'image')
    validate.text(text)
    validate.maxLength(text, 500, 'text')

    // Busca y devuelve un documento en data.posts cuyo _id coincida con postObjectId
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // Datos que usara
            const post = {
                author: userId,
                image,
                text
            }

            // Inserta el objeto post en la colección data.posts y devuelve el resultado
            return Post.create(post)
                .catch(error => { throw new SystemError(error.message) })
        })

        // Si todo va bien 
        .then(() => { console.log("Changes OK") })

}