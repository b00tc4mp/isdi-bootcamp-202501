import 'dotenv/config'
import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getPosts')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        let posts

        try {
            return getPosts('67e0655b163e8121156a41db')
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

