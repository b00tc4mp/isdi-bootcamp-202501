import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError } = errors

// Funcion para añadir un Posts nuevo
export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(image, 500, 'image')
    validate.text(text, 'text')
    validate.maxLength(text, 500, 'text')

    // Convierte postId en un ObjectId de MongoDB para consultas a la base de datos 
    const userObjectId = new ObjectId(userId)

    // Busca y devuelve un documento en data.posts cuyo _id coincida con postObjectId
    return data.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // Datos que usara
            const post = {
                author: userObjectId,
                image: image,
                text: text,
                createdAt: new Date(),
                modifiedAt: null,
                likes: []
            }

            // Inserta el objeto post en la colección data.posts y devuelve el resultado
            return data.posts.insertOne(post)
                .catch(error => { throw new SystemError(error.message) })
        })

        // Si todo va bien 
        .then(() => { console.log("Changes OK") })

}