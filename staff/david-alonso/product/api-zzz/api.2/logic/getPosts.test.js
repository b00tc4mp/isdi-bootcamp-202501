import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('m7313t7yhcl')

    console.log(posts)
} catch (error) {
    console.error(error)
}