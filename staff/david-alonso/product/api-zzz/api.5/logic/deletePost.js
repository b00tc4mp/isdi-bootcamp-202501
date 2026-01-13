// BORRAR UN POST 

import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError, OwnershipError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    // Busca y devuelve un usuario en data.users cuyo _id coincida con userId, lo convirte en ObjectId para MongoDB
    return data.users.findOne({ _id: new ObjectId(userId) })

        // Lanzamos un error si fallara la base de datos
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // Convierte postId en un ObjectId de MongoDB para consultas a la base de datos
            const postObjectId = new ObjectId(postId)

            // Busca y devuelve un documento en data.posts cuyo _id coincida con postObjectId
            return data.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

                    // Elimina un documento en la colección data.posts cuyo _id coincida con postObjectId
                    return data.posts.deleteOne({ _id: postObjectId })
                        .catch(error => { throw new SystemError(error.message) })
                })

                // Si todo va bien 
                .then(() => { console.log("Changes OK") })
        })
}
