import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserPosts } from './getUserPosts.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserPosts')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        let posts

        try {
            return getUserPosts('67e0655b163e8121156a41db')
                .then(result => {
                    posts = result
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