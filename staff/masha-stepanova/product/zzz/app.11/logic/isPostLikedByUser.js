import { data } from '../data/index.js'

export const isPostLikedByUser = (postId) => {
    const posts = data.posts.getAll()

    const { userId } = data

    let postToLike = posts.findOne(post => post.id === postId)

    for (var i = 0; i < postToLike.likes.length; i++) {
        if (postToLike.likes[i] === userId) {
            return true
        }
    }
    return false
}