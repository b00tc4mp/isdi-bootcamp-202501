import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

console.info('TEST getPosts')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let posts2

            return getPosts('67dae1cd0a914c7c2ba729a2')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts2 is an array'))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())