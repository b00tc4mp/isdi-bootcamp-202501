import { NotFoundError, OwnershipError } from '../errors.js'

import { data } from '../data/index.js'
import { validate } from './validate.js'

export const updatePostText = (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text, 'text')
    validate.maxLength(text, 400, 'text')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const post = data.posts.findOne(post => postId === post.id)

    if (!post) throw new NotFoundError('post not found')

    if (post.author !== userId) throw new OwnershipError('user is not author of post')

    post.text = text
    post.modifiedAt = new Date()

    data.posts.updateOne(post => post.id === postId, post)
}

