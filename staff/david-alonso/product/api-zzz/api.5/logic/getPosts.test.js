import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

console.info('TEST getPosts')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let posts2

            return getPosts('67e2e902a6186f4249516d21')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts is an array'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
