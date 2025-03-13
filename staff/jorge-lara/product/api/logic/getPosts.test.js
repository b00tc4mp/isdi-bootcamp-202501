import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('20y8wll1xsu')

    console.log(posts)
} catch (error) {
    console.error(error)
}