import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const post = data.posts.findOne(post => post.id === postId)

    if (!post) throw new NotFoundError('post not found')

    let userIdFound = false

    for (let i = 0; i < post.likes.length && !userIdFound; i++) {
        const id = post.likes[i]

        if (id === userId) {
            userIdFound = true
        }
    }

    if (!userIdFound) {
        post.likes[post.likes.length] = userId
    } else {
        const likes = []

        for (let i = 0; i < post.likes.length; i++) {
            const id = post.likes[i]

            if (id !== userId) {
                likes[likes.length] = id
            }
        }

        post.likes = likes
    }

    data.posts.updateOne(post => post.id === postId, post)
}