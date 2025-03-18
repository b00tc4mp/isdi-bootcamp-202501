import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('m8euvm2fw1m')

    console.log(posts)
} catch (error) {
    console.error(error)
}