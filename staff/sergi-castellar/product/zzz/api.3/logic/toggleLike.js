import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { ObjectId } = data
const { NotFoundError, SystemError } = errors

export const toggleLike = (userId, currentPostId) => {
    validate.id(userId, 'id')
    validate.id(currentPostId, 'id')

    const userObjectId = new ObjectId(userId)
    const currentPostObjectId = new ObjectId(currentPostId)

    return data.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return data.posts.findOne({ _id: currentPostObjectId })
                .catch(error => { throw new SystemError(error.message) })
                .then(currentPost => {
                    if (!currentPost) throw new NotFoundError('post not found')
                    const likes = currentPost.likes

                    const likePosition = likes.findIndex(id => id.equals(userId))
                    const isAlreadyLiked = likePosition !== -1

                    if (!isAlreadyLiked) {
                        likes.push(userObjectId)
                    } else {
                        likes.splice(likePosition, 1)
                    }

                    return data.posts.updateOne({ _id: currentPostObjectId }, { $set: { likes } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}
