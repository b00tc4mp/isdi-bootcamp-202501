// BORRAR UN POST 

import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    // Busca y devuelve un usuario en data.users cuyo _id coincida con userId, lo convirte en ObjectId para MongoDB
    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean()
    ])
        // Lanzamos un error si fallara la base de datos
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

            // Elimina un documento en la colección data.posts cuyo _id coincida con postObjectId
            return Post.deleteOne({ _id: postId })
                .catch(error => { throw new SystemError(error.message) })
        })

        // Si todo va bien 
        .then(() => { console.log("Changes OK") })
}
