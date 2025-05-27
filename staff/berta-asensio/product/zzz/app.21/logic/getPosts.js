import { data } from '../data/index.js'

export const getPosts = () => {
        const posts = data.posts.getAll() //llamamos al método 
        const { userId } = data //destructuramos el usuario para no tener que poner todo el rato data. Estamos llamando al getter de userId aqui.
        
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