import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('m7yp34lurs6')

    console.log(posts)
} catch (error) {
    console.error(error)
}