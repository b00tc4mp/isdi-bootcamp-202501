import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(image, 500, 'image')
    validate.text(text)
    validate.maxLength(text, 500, 'text')

    return User.findById(userId).lean() //el lean acelera las busquedas porque no trae un modelo, trae un documento
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const post = {
                author: userId,
                image, //Si la variable se llama igual que el campo del objeto se puede dejar asi
                text
            }

            return Post.create(post)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })

}