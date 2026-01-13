import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { NotFoundError } = errors

export const toggleLike = (userId, currentPostId) => {
    validate.id(userId, 'id')
    validate.id(currentPostId, 'id')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const currentPost = data.posts.findOne(post => post.id === currentPostId)

    if (!currentPost) throw new NotFoundError('post not found')

    const likePosition = currentPost.likes.indexOf(userId)
    const isAlreadyLiked = likePosition !== -1

    if (!isAlreadyLiked) {
        currentPost.likes.push(userId)
    } else {
        currentPost.likes.splice(likePosition, 1)
    }

    data.posts.updateOne(currentPost)
}
