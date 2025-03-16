import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const user = data.users.findOne(user => user.id === userId)
    console.log(user)

    if (!user) throw new NotFoundError('user not found')

    const post = data.posts.findOne(post => post.id === postId)
    console.log(post)

    if (!post) throw new NotFoundError('post not found')

    const index = post.likes.findIndex(likeUserId => likeUserId === userId)
    console.log(index)

    if (index < 0)
        post.likes.push(userId)
    else
        post.likes.splice(index, 1)
    console.log(post)

    // for (var i = 0; i < postToLike.likes.length; i++) {
    //     if (postToLike.likes[i] === userId) {
    //         postToLike.likes.splice(i, 1)
    //         data.posts.updateOne(post => post.id === postId, postToLike)
    //         return
    //     }
    // }
    // postToLike.likes[postToLike.likes.length] = userId

    data.posts.updateOne(post => post.id === postId, post)

    console.log('liked')
}