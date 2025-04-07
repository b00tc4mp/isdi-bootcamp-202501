import { data } from '../data/index.js'
import { validate } from './validate.js'

import { NotFoundError } from '../errors.js'

export const getPosts = userId => {
    validate.id(userId, 'userId')
    // insertamos los posts de data a la variable posts 
    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const posts = data.posts.getAll()

    const aggregatedPosts = []

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i]

        let liked = false // inicializamos liked en false

        for (let i = 0; i < post.likes.length && !liked; i++){
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

        aggregatedPosts[aggregatedPosts.length] = aggregatedPost
    }

    return aggregatedPosts.reverse()
}