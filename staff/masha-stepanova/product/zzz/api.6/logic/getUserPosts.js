import { User, ObjectId, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export const getUserPosts = userId => {
    validate.id(userId, 'userId')

    const userObjectId = new ObjectId(userId)

    return User.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const aggregatedPosts = []

                    for (let i = 0; i < posts.length; i++) {
                        const post = posts[i]

                        if (post.author.toString() === userId) {
                            let liked = false

                            for (let i = 0; i < post.likes.length && !liked; i++) {
                                const id = post.likes[i]

                                if (id.toString() === userId)
                                    liked = true
                            }

                            const authorId = post.author.toString()

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

                            aggregatedPosts.push(aggregatedPost)

                        }
                    }
                    return aggregatedPosts.reverse()
                })
        })
}
