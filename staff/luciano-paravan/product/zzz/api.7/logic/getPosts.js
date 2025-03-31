import { SystemError } from 'com/errors.js'
import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

export const getPosts = userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.find().select('-__v').sort('-createdAt').populate('author', 'username').lean()
    ])

        .catch(error => { throw new SystemError(error.message) })
        .then(([user, posts]) => {
            if (!user) throw new NotFoundError('user not found')

            posts.forEach(post => {
                post.id = post._id.toString() //como le pusimos un lean() viene el objeto plano como si fuera de mongo, mongo no tiene id, entonces le ponemos el _id.toString()
                delete post._id //borramos el post, porque no queremos devolver eso

                //Esto se hace porque cuando se traen post mogoose lo que hace para aprovechar la memoria , si dos posts tienen el mismo author, te crea dos objetos iguales referenciados por posts diferentes
                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }

                post.liked = post.likes.some(userObjectId => userObjectId.toString() === userId)//te permite agarrar cada objectId y compararlo con el userId que teniamos arriba
                post.likesCount = post.likes.length
                delete post.likes

                post.own = post.author.id === userId //aca uso el author.id que normalice lineas arriba

            })

            return posts
        })
}