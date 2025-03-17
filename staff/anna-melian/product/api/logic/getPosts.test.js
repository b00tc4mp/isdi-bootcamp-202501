import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('m71tml17ly')

    console.log(posts)
} catch (error) {
    console.error(error)
}