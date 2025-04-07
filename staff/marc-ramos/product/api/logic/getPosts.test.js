import 'dotenv/config'
import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getPosts')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let posts2

            return getPosts('67e6bbb7793f289af9b62dcd')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts2 in an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())