import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

console.info('TEST getPosts')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        let posts

        try {
            return getPosts('67dc24464fb4f765fd5e5a67')
                .then(result => {
                    posts = result
                    console.log(posts)
                })
                .finally(() => {
                    console.assert(posts instanceof Array, 'posts is an array')
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

