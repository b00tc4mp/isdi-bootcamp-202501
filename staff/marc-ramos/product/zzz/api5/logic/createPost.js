import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError } = errors

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(image, 500, 'image')
    validate.text(text, 'text')
    validate.maxLength(text, 500, 'text')

    const userObjectId = new ObjectId(userId)


    return data.users.findOne({ _id: userObjectId })
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('user not found')

                const post = {
                    author: userObjectId,
                    image,
                    text,
                    createdAt: new Date(),
                    modifiedAt: null,
                    likes: []
                }

                return data.posts.insertOne(post)
                    .catch(error => { throw new SystemError(error.message)})
                
            })
            .then(() => {})
}