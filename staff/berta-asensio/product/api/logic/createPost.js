
import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

/*
-Creamos y exportamos la función de createPost y le pasamos sus parámetros.
-Validamos todos los parámetros.
-Como userId es un string, se convierte en un ObjectId de Mongo para poder buscarlo
en la base de datos. AHORA MONGOOSE
-Buscamos en la colección de users si el usuario ya existe mediante su id.
-Si durante la búsqueda hay algun error, lanzamos un SystemError.
-Si todo va bien, entramos en el then:
    -Si no se encuentra el usuario. se lanza NotFoundError
    -Si lo encuentra, se crea un nuevo objeto con los parámetros de post.
-Insertamos el post en la base de datos dentro de la colección posts.
-Si hay algun error, lanzamos un System error.
-El último then no hace nada, simplemente indica que la operación ha terminado
y que no queremos devolver nada.

*/

export const createPost = (userId, image, text) => { 
        validate.id(userId)
        validate.url(image)
        validate.maxLength(image, 800, 'image')
        validate.text(text)
        validate.maxLength(text, 500, 'text')

        return User.findById(userId).lean()
            .catch(error => { throw new SystemError (error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('user not found')

                const post = {
                    author: userId, 
                    image, 
                    text, 
                }

                return Post.create(post)
                    .catch(error => { throw new SystemError(error.message)
                    })
            })
            .then(() => { })
}
