import { SystemError } from 'com/errors.js'
import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { NotFoundError } = errors

export const getPosts = userId => {
    validate.id(userId, 'userId')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return data.posts.find().toArray() //Aca hay una operacion con base de datos, entonces ponemos otro catch debajo
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => { //Este .then queda mas elegante ponerlo fuera del anterior
            const authors = posts.map(({ author }) => author) //destructuro el post obteniendo author y creo un array con todos id de los author

            return data.users.find({ _id: { $in: authors } }).toArray() //Busca todos los usuarios cuyos id este dentro del array authors. Esto devuelve un cursor, por eso tuvimos que agregar el .toArray()
                .catch(error => { throw new SystemError(error.message) })
                .then(users => { //este .then lo dejo aqui dentro porque necesito tener visible los posts
                    const aggregatedPosts = []

                    for (let i = 0; i < posts.length; i++) {
                        const post = posts[i]

                        let liked = false

                        for (let i = 0; i < post.likes.length && !liked; i++) {
                            const userObjectId = post.likes[i]

                            if (userObjectId.toString() === userId) {
                                liked = true
                            }
                        }

                        const authorId = post.author.toString() //Como lo usaba 3 veces, lo crea una vez

                        const user = users.find(user => user._id.toString() === authorId) //Este find es metodo de array normal, no es de mongo

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