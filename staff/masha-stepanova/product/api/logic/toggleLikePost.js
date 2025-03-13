import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    let postToLike = data.posts.findOne(post => post.id === postId)

    if (!postToLike) throw new NotFoundError('post not found')

    for (var i = 0; i < postToLike.likes.length; i++) {
        if (postToLike.likes[i] === userId) {
            postToLike.likes.splice(i, 1)
            data.posts.updateOne(post => post.id === postId, postToLike)
            return
        }
    }
    postToLike.likes[postToLike.likes.length] = userId

    data.posts.updateOne(post => post.id === postId, postToLike)
}