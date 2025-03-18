import { getPosts } from './getPosts.js'

//nos trae un listado de todos los posts.
try {
    const posts = getPosts('m76fexkfwpd')

    console.log(posts)
    
} catch (error) {
    console.error(error)
}