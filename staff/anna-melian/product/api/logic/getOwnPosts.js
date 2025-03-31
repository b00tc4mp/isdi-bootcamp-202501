/*
import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getOwnPosts = userId => {
    validate.id(userId, 'userId')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    const posts = data.posts.getAll()

    const myPosts = posts.filter(post => post.author.id === userId)

    const aggregatedPosts = []

    for (let i = 0; i < myPosts.length; i++) {
        const post = myPosts[i]

        let liked = false

        for (let i = 0; i < post.likes.length && !liked; i++) {
            const id = post.likes[i]

            if (id === userId)
                liked = true
        }


        const aggregatedPost = {
            id: post.id,
            author: post.author,
            image: post.image,
            text: post.text,
            createdAt: new Date(post.createdAt),
            modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
            liked: liked,
            likesCount: post.likes.length,
            own: post.author.id === userId
        }

        aggregatedPosts[aggregatedPosts.length] = aggregatedPost
    }

    return aggregatedPosts.reverse()

}

*/