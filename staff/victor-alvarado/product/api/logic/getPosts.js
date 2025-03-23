// 📌 Importa el error 'SystemError' desde el archivo 'com/errors.js'.
// Este error parece ser una clase personalizada para manejar errores más específicos.
import { SystemError } from 'com/errors.js'

// 📌 Importa 'data' desde el archivo '../data/index.js'.
// 'data' contiene la lógica para interactuar con la base de datos (probablemente MongoDB).
import { data } from '../data/index.js'

// 📌 Importa 'errors' y 'validate' desde 'com'.
// 'errors' contiene tipos de errores personalizados, y 'validate' contiene funciones para validación.
import { errors, validate } from 'com'

// 📌 Desestructura el objeto 'data' para obtener 'ObjectId', que se usa para manejar identificadores de MongoDB.
const { ObjectId } = data

// 📌 Desestructura el objeto 'errors' para obtener 'NotFoundError'.
// Este error probablemente se lanza cuando no se encuentra un recurso (como un usuario o post).
const { NotFoundError } = errors

// 📌 Exporta la función 'getPosts', que recibe un 'userId' como argumento.
// Esta función obtiene los posts de un usuario específico.
export const getPosts = userId => {
    // 📌 Llama a la función 'validate.id' para asegurarse de que el 'userId' es válido.
    // Si no es válido, lanzará un error. El segundo argumento es un mensaje de error.
    validate.id(userId, 'userId')

    // 📌 Realiza una búsqueda en la base de datos para encontrar el usuario con el 'userId' proporcionado.
    return data.users.findOne({ _id: new ObjectId(userId) }) // Convierte 'userId' a un tipo de ObjectId de MongoDB
        .catch(error => {
            // 📌 Si ocurre un error en la búsqueda del usuario, se lanza un 'SystemError' con el mensaje del error.
            throw new SystemError(error.message)
        })
        .then(user => {
            // 📌 Si no se encuentra el usuario, lanza un 'NotFoundError' con un mensaje.
            if (!user) throw new NotFoundError('user not found')

            // 📌 Si el usuario se encuentra, se obtienen todos los posts de la base de datos.
            return data.posts.find().toArray() // Convierte el resultado en un array
                .catch(error => {
                    // 📌 Si hay un error en la consulta de posts, se lanza un 'SystemError'.
                    throw new SystemError(error.message)
                })
        })
        .then(posts => {
            // 📌 Extrae los autores de todos los posts obtenidos, obteniendo solo sus ID de autor.
            const authors = posts.map(({ author }) => author)

            // 📌 Busca los usuarios cuyo '_id' está en la lista de autores extraída anteriormente.
            return data.users.find({ _id: { $in: authors } }).toArray() // Encuentra los usuarios cuyo '_id' está en la lista de 'authors'
                .catch(error => {
                    // 📌 Si ocurre un error al buscar los usuarios, se lanza un 'SystemError'.
                    throw new SystemError(error.message)
                })
                .then(users => {
                    // 📌 Crea un array vacío donde se almacenarán los posts con datos agregados (por ejemplo, el nombre de usuario del autor).
                    const aggregatedPosts = []

                    // 📌 Recorre cada post para agregar información adicional, como si el usuario ha dado "me gusta" al post.
                    for (let i = 0; i < posts.length; i++) {
                        const post = posts[i]

                        let liked = false // Variable para indicar si el usuario ha dado "me gusta"

                        // 📌 Recorre los "likes" del post y verifica si el 'userId' está en la lista de "likes".
                        for (let i = 0; i < post.likes.length && !liked; i++) {
                            const id = post.likes[i]

                            if (id === userId) liked = true // Si encuentra el 'userId' en los likes, se marca como 'liked'
                        }

                        // 📌 Convierte el 'author' (que probablemente sea un ObjectId) en un string para comparación.
                        const authorId = post.author.toString()

                        // 📌 Busca el usuario correspondiente al autor del post.
                        const user = users.find(user => user._id.toString() === authorId)

                        // 📌 Crea un objeto con los datos combinados del post y el autor (agregado con información del usuario).
                        const aggregatedPost = {
                            id: post._id.toString(), // ID del post como string
                            author: { id: authorId, username: user.username }, // Información del autor
                            image: post.image, // Imagen del post
                            text: post.text, // Texto del post
                            createdAt: new Date(post.createdAt), // Fecha de creación
                            modifiedAt: post.modifiedAt && new Date(post.modifiedAt), // Fecha de modificación (si existe)
                            liked: liked, // Indica si el usuario ha dado "me gusta"
                            likesCount: post.likes.length, // Número de "me gusta"
                            own: authorId === userId // Indica si el post es del usuario
                        }

                        // 📌 Agrega el post procesado al array 'aggregatedPosts'.
                        aggregatedPosts[aggregatedPosts.length] = aggregatedPost
                    }

                    // 📌 Devuelve los posts con los datos agregados, ordenados de manera invertida.
                    return aggregatedPosts.reverse()
                })
        })
}