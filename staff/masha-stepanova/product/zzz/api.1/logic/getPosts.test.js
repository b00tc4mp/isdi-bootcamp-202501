import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('m7yz5vpd0gg')

    console.log(posts)
} catch (error) {
    console.error(error)
}