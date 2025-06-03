import { getUserPosts } from './getUserPosts.js'

try {
    const posts = getUserPosts('m7yz5vpd0gg')

    console.log(posts)
} catch (error) {
    console.error(error)
}