import 'dotenv/config'
import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

console.info('TEST createPost')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let posts2

            return getPosts('67e56b76aca435b739796a5c')
                .then(posts => posts2 = posts)
                .then(console.log)
                .finally(() => console.assert(posts2 instanceof Array, 'posts must be an Array'))
        } catch (error) {
            console.error(error)
        }
    })
    // .catch(error => console.error(error)) => can be breakpointed on debugger
    .catch(console.error)           // cant be breakpointed on debugger
    // .finally(() => data.disconnect()) => can be breakpointed on debugger
    .finally(data.disconnect)       // cant be breakpointed on debugger