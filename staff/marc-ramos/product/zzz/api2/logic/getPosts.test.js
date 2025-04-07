import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('m866ajbah4')

    console.log(posts)
} catch (error) {
    console.error(error)
}