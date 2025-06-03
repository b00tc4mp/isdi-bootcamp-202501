import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserPosts } from './getUserPosts.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserPosts')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        let posts

        try {
            return getUserPosts('67ed50b6067089f2f3f0a9e3', '67ed50b6067089f2f3f0a9e4')
                .then(result => {
                    posts = result
                })
                .finally(() => {
                    console.assert(posts instanceof Array, 'posts is an array')
                    console.log(posts)
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())