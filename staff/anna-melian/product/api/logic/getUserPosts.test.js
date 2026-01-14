import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserPosts } from './getUserPosts.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserPosts')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let posts2

            return getUserPosts('67ec4499711dacde62ff0d8a', '67ec4499711dacde62ff0d8b')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts2 is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())