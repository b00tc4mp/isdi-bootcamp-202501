import 'dotenv/config'
import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

console.info('TEST getPosts')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let posts2

            return getPosts('67e48815ca2262aa6ec9d0cb')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts is an array'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
