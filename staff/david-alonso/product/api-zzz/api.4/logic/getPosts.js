// OBTENER PUBLICACIONES

import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError } = errors

// Funcion para Obtener los Posts
export const getPosts = userId => {
    validate.id(userId, 'userId')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.messaage) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return data.posts.find().toArray()
                .catch(error => { throw new SystemError(error.message) })
        })

        .then(posts => {

            const authors = posts.map(({ author }) => author)

            return data.users.find({ _id: { $in: authors } }).toArray()
                .catch(error => { throw new SystemError(error.messaage) })
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

                        // Publicacion agregada
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

                        // Agrega "aggregatedPost" al final del array "aggregatedPosts"
                        aggregatedPosts[aggregatedPosts.length] = aggregatedPost
                    }

                    return aggregatedPosts.reverse()
                })


        })
}



