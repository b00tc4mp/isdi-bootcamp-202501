import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserPosts } from './getUserPosts.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserPosts')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let posts2

            return getUserPosts('67ec1f032e0b6ef4fed01b3a', '67ec1f032e0b6ef4fed01b38')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts2 is an array'))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())