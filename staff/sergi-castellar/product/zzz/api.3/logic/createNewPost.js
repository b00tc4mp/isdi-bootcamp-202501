import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { ObjectId } = data
const { NotFoundError, SystemError } = errors

export const createNewPost = (userId, imageSrc, textDescription) => {
    validate.id(userId, 'id')
    validate.url(imageSrc, 'url')
    validate.description(textDescription, 'description')

    const userObjectId = new ObjectId(userId)

    return data.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const newPost = {
                authorId: userObjectId,
                imageSrc,
                textDescription,
                createdAt: new Date(),
                modifiedAt: null,
                likes: []
            }

            return data.posts.insertOne(newPost)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
