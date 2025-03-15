import { getPosts } from './getPosts.js'

//nos trae un listado de todos los posts.
try {
    const posts = getPosts('m76fexkfwpd')

    console.log(posts)
    console.log(posts1)
} catch (error) {
    console.error(error)
}