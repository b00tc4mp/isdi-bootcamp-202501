// CAMBIAR EL TEXTO DEL POSTS
import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export const updatePostText = (userId, postId, text) => {
    validate.id(userId)
    validate.id(postId)
    validate.text(text)
    validate.maxLength(text, 300, 'text')

    // Busca y devuelve un usuario en data.users cuyo _id coincida con userId, lo convirte en ObjectId para MongoDB
    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean()
    ])

        // Lanzamos un error si fallara la base de datos
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            // Si el Usuario no existe se lanza un error
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            // Comprobamos si el autor del post (post.author) no coincide con userId, y si no, lanza un error
            if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

            // Actualiza un documento en la colección data.posts cuyo _id coincide con postObjectId, estableciendo ($set) los cambios para text y modifiedAt
            return Post.updateOne({ _id: postId }, {
                $set: {
                    text,
                    modifiedAt: new Date
                }
            })
                // Si falla sale un error
                .catch(error => { throw new SystemError(error.message) })

        })

        // Si todo va bien 
        .then(() => { console.log("Changes OK") })
}