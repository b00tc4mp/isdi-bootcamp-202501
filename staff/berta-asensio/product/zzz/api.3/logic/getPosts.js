
import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError } = errors


export const getPosts = (userId) => { 
        validate.id(userId, 'userId') 

        return data.users.findOne({ _id: new ObjectId(userId) })
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('user not found')

                return data.posts.find().toArray()
                    .catch(error => { throw new SystemError(error.message) })
            })
            .then(posts => {
                const authors = posts.map(({ author }) => author) //const authors = posts.map(post => post.author)

                return data.users.find({ _id: { $in: authors } }).toArray()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(users => {
                        const aggregatedPosts = []

                        for (let i = 0; i < posts.length; i++) {
                            const post = posts[i]
        
                            let liked = false
        
                            for (let i = 0; i < post.likes.length && !liked; i++) {
                                const userObjectId = post.likes[i]
        
                                if (userObjectId.toString() === userId)
                                    liked = true
                            }

                            const authorId = post.author.toString()
        
                            const user = users.find(user => user._id.toString() === authorId)
        
                            const aggregatedPost = {
                                id: post._id.toString(),
                                author: { id: authorId, username: user.username },
                                image: post.image,
                                text: post.text,
                                createdAt: new Date(post.createdAt),
                                modifiedAt: post.modifiedAt && new Date(post.modifiedAt), // si viene el dato, lo convierto en date si no lo mantengo en null
                                liked: liked,
                                totalLikes: post.likes.length,
                                own: authorId === userId
        
                            }
        
                            aggregatedPosts[aggregatedPosts.length] = aggregatedPost
                        }
        
                        return aggregatedPosts.reverse()                       
                    })
            })         
}

/*
-Declaración de la función getPosts, que recibe userId.
-Se valida que userId tenga el formato adecuado.
-Se busca al usuario en la  base de datos. newObjectOd convierte userId
en un objeto tipo ObjectId (necesario para Mongo).
-Si ocurre un error se lanza un System Error, si no entramos en el then:
-THEN 1: 
    -Verificamos si el usuario existe:
        -Si no existe: NotFoundError.
        -Si existe: se busca la colección de posts en la base de datos y se
        convierte el resultado de la búsqueda en un array. Cualquier error en 
        ésta búsqueda, se lanza un SystemError.
-Una vez obtenidas las publicaciones, entramos en el then 2:
-THEN 2:
    -Usamos map para crear un arreglo con los id de los autores de cada publicación.
    -Buscamos los usuarios(los autores) cuyo _id esté incluido en el arreglo de authors.
    El operador $in de Mongo permite buscar múltiples valores en el campo _id.
    -El resultado se convierte en un array. Cualquier error se lanza un SystemError.
    -THEN 3: 
        -Una vez obtenidos los authores, se crea un arreglo vacío para almacenar las publicaciones
        agregadas con los detalles (autor, likes).
        -Se itera sobre cada uno de los posts.
        -Para cada publicación, se inicializa una variable liked como false.
        -Se recorre el arreglo post.likes para saber si el userId ha dado like en algun
        posts. Si encuentra alguna coincidencia, se establece liked como true.
        -Se convierte al post.author en una cadena y se bisca al usuario correspondiente
        en el arreglo users con find().
        -Se crea un objeto con diferentes campos y se agrega el obheto a un arreglo.
        -Una vez procesadas todas las publicaciones, se devuelve el arreglo invertido.
*/