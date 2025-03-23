// Importamos el módulo 'data', que probablemente maneja la base de datos.
import { data } from '../data/index.js'

// Importamos funciones de validación y errores personalizados.
import { errors, validate } from 'com'

// Extraemos `ObjectId` del módulo `data`.
// `ObjectId` se usa para convertir un string en un ID válido de MongoDB.
const { ObjectId } = data

// Extraemos clases de error personalizadas del módulo `errors`.
// - `SystemError`: Para errores generales del sistema.
// - `NotFoundError`: Para cuando un usuario o recurso no existe.
const { SystemError, NotFoundError } = errors

// Definimos la función `createPost`, que crea una nueva publicación en la base de datos.
export const createPost = (userId, image, text) => {

    // **VALIDACIONES**: Verificamos que los datos sean correctos antes de guardarlos.

    validate.id(userId, 'userId')       // Verifica que `userId` sea un ID válido.
    validate.url(image, 'image')        // Verifica que `image` sea una URL válida.
    validate.maxLength(image, 500, 'image') // Asegura que la URL no supere los 500 caracteres.
    validate.text(text, 'text')         // Verifica que `text` sea un texto válido.
    validate.maxLength(text, 500, 'text')   // Asegura que el texto no supere los 500 caracteres.

    // Convertimos `userId` de string a `ObjectId` para poder buscar en MongoDB.
    const userObjectId = new ObjectId(userId)

    // **BUSCAMOS AL USUARIO EN LA BASE DE DATOS**
    return data.users.findOne({ _id: userObjectId })
        .catch(error => {
            // Si hay un error en la búsqueda, lanzamos un `SystemError` con el mensaje del error.
            throw new SystemError(error.message)
        })
        .then(user => {
            // Si el usuario no existe, lanzamos un error de "usuario no encontrado".
            if (!user) throw new NotFoundError('user not found')

            // **CREAMOS EL POST**
            const post = {
                author: userObjectId,  // Guardamos el ID del usuario como autor.
                image,                 // URL de la imagen.
                text,                  // Texto del post.
                createdAt: new Date(), // Fecha de creación (momento actual).
                modifiedAt: null,      // `modifiedAt` es `null` porque el post aún no se ha editado.
                likes: []              // Inicialmente, el post no tiene "likes".
            }

            // Insertamos el post en la base de datos.
            return data.posts.insertOne(post)
                .catch(error => {
                    // Si hay un error al guardar el post, lanzamos un `SystemError`.
                    throw new SystemError(error.message)
                })
        })
        // No devolvemos nada al final.
        .then(() => { })
}