
import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'


const { SystemError, NotFoundError, OwnershipError } = errors


export const updatePostText = (userId, postId, text) => {
    // Primero, validamos que los parámetros sean correctos.
    validate.id(userId, 'userId')    // Validamos que el userId sea un ID válido.
    validate.id(postId, 'postId')    // Validamos que el postId sea un ID válido.
    validate.text(text, 'text')      // Validamos que el texto proporcionado sea válido.
    validate.maxLength(text, 400, 'text') // Validamos que el texto no tenga más de 400 caracteres.

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

            return Post.updateOne({ _id: postId }, {
                $set: {
                    text,
                    modifiedAt: new Date
                }

            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}




