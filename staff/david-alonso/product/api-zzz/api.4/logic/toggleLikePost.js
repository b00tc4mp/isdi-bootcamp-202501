// CAMBIAR LIKE A UN POST

import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError } = errors

// Agrega o elimina el Like de los Posts
export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userObjectId = new ObjectId(userId)

    return data.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const postObjectId = new ObjectId(postId)

            // Variable Encontrar el Post
            return data.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    // Si Post es undefined o null, lanza un error NotFoundError y detiene la ejecución
                    if (!post) throw new NotFoundError('post not found')

                    const { likes } = post

                    const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

                    if (index < 0)
                        likes.push(userObjectId)
                    else
                        likes.splice(index, 1)

                    return data.posts.updateOne({ _id: postObjectId }, { $set: { likes } })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })

                })
        })
}