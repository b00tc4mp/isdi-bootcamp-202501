import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'
import { Types } from 'mongoose'

const { ObjectId } = Types;
const { SystemError, NotFoundError } = errors;

export const addPost = (userId, text, image) => {
    validate.id(userId, 'id');
    validate.text(text, 'text');
    validate.maxLength(text, 500, 'text')
    validate.url(image, 'url');
    validate.maxLength(image, 500, 'image');

    const userObjectId = new ObjectId(userId);

    return User.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            const post = {
                author: userId,
                image: image,
                text: text,
                createdAt: new Date(),
                modifiedAt: null,
                likes: []
            }

            return Post.insertOne(post)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}