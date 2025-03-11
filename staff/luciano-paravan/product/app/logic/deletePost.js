import { NotFoundError } from '../errors.js'

import { data } from '../data/index.js'
import { validate } from './validate.js'

export const deletePost = (postId) => {
    validate.id(postId, 'postId')

    const { userId } = data

    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) throw new NotFoundError('post not found')

    if (foundPost.author !== userId) throw new OwnershipError('user is not author of post')

    data.posts.deleteOne(post => post.id === postId)
}