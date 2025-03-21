import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

console.info('TEST getPosts')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let posts2

            return getPosts('67dd3aacae6eebd29ddf55c7')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts2 is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())