import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('m7ypqlzdwy')

    console.log(posts)
} catch (error) {
    console.error(error)
}