import { data } from './../data/index.js';
import { validate, errors } from 'com';

const { ObjectId } = data
const { SystemError } = errors

export const getPosts = userId => {
    validate.id(userId, 'id')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return data.posts.find().toArray()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => {
            const authors = posts.map(({ authorId }) => authorId)
            return data.users.find({ _id: { $in: authors } }).toArray()
                .catch(error => { throw new SystemError(error.message) })
                .then(users => {
                    const aggregatedPosts = []

                    posts.forEach(post => {

                        let liked = false

                        liked = post.likes.map(id => id.toString()).includes(userId) ? true : false

                        const authorId = post.authorId.toString()

                        const author = users.find(user => user._id.toString() === authorId)
                        author._id = authorId

                        const { _id, imageSrc, textDescription, createdAt, modifiedAt, likes } = post;

                        const aggregatedPost = {
                            id: _id.toString(),
                            author: { ...author },
                            imageSrc: imageSrc,
                            textDescription: textDescription,
                            createdAt: new Date(createdAt),
                            modifiedAt: modifiedAt && new Date(modifiedAt),
                            likes: likes,
                            liked: liked,
                            own: authorId === userId
                        }

                        aggregatedPosts.push(aggregatedPost)
                    })

                    return aggregatedPosts
                })
        })
}
