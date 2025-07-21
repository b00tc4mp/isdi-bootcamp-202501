import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserPosts } from './getUserPosts.js'

const { MONGO_URL, MONGO_DBNAME } = process.env

console.info('TEST getUserPosts')

data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let posts2

            return getUserPosts('67efd1cb665577c9cef1b2bd', '67efd1cb665577c9cef1b2bf')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts2 is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())