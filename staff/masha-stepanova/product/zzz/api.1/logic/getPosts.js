import { data } from '../data/index.js'
import { validate } from './validate.js'

export const getPosts = userId => {
    validate.id(userId, 'userId')

    const posts = data.posts.getAll()

    const aggregatedPosts = []

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i]

        let liked = false

        for (let i = 0; i < post.likes.length && !liked; i++) {
            const id = post.likes[i]

            if (id === userId)
                liked = true
        }

        const user = data.users.getById(post.author)

        const aggregatedPost = {
            id: post.id,
            author: { id: post.author, username: user.username },
            image: post.image,
            text: post.text,
            createdAt: new Date(post.createdAt),
            modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
            liked: liked,
            likesCount: post.likes.length,
            own: post.author === userId

        }

        aggregatedPosts.push(aggregatedPost)
    }

    return aggregatedPosts.reverse()
}