import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

//Esta función trae los posts
export const getPosts = (userId) => { //ahora le pasamos el userId para que lo coja de la app
        validate.id(userId, 'userId') //validamos userId

        //Y comprobamos que el usuario exista
        const user = data.users.getById(userId)

        if(!user) throw new NotFoundError ('user not found')

        const posts = data.posts.getAll() //llamamos al método 
        
        const aggregatedPosts = []

        for (let i = 0; i < posts.length; i++)  {
            const post = posts[i]

            let liked = false

            for (let i = 0; i < post.likes.length && !liked; i++) {
                const id = post.likes[i]

                if(id === userId)
                    liked = true
            }

            const user = data.users.getById(post.author)

            const aggregatedPost = {
                id: post.id, 
                author: { id: post.author, username: user.username }, 
                image: post.image, 
                text: post.text,
                createdAt: new Date(post.createdAt),
                modifiedAt: post.modifiedAt && new Date(post.modifiedAt), // si viene el dato, lo convierto en date si no lo mantengo en null
                liked: liked,
                totalLikes: post.likes.length,
                own: post.author === userId

            }

            aggregatedPosts[aggregatedPosts.length] = aggregatedPost
        }

        return aggregatedPosts.reverse()
}