import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError, OwnershipError } from '../errors.js'

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const post = data.posts.findOne(post => post.id === postId)

    if (!post) throw new NotFoundError('post not found')

    if (post.author !== userId) throw new OwnershipError('user is not author of post')

    data.posts.deleteOne(post => post.id === postId)
}