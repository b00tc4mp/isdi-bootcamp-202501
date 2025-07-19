import { SystemError } from 'com/errors.js'
import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getPosts = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find().lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => {
            const authors = posts.map(({ author }) => author)

            return User.find({ _id: { $in: authors } }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(users => {
                    const aggregatedPosts = []

                    for (let i = 0; i < posts.length; i++) {
                        const post = posts[i]

                        let liked = false

                        for (let i = 0; i < post.likes.length && !liked; i++) {
                            const userObjectId = post.likes[i]

                            if (userObjectId.toString() === userId)
                                liked = true
                        }

                        const authorId = post.author.toString()

                        const user = users.find(user => user._id.toString() === authorId)

                        const aggregatedPost = {
                            id: post._id.toString(),
                            author: { id: authorId, username: user.username },
                            image: post.image,
                            text: post.text,
                            createdAt: new Date(post.createdAt),
                            modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                            liked: liked,
                            likesCount: post.likes.length,
                            own: authorId === userId
                        }

                        aggregatedPosts[aggregatedPosts.length] = aggregatedPost
                    }

                    return aggregatedPosts.reverse()
                })
        })
}