import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError, OwnershipError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const postObjectId = new ObjectId(postId)

            return data.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

                    return data.posts.deleteOne({ _id: postObjectId })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(() => { })
        })
}