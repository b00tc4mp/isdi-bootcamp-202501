import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getUserPosts = userId => {
    validate.id(userId, 'userId')

    let user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const posts = data.posts.getAll()

    const aggregatedPosts = []

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i]

        if (post.author === userId) {

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
    }
    return aggregatedPosts.reverse()
}
