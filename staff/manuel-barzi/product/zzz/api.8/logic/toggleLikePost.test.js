import 'dotenv/config'
import { data } from '../data/index.js'
import { toggleLikePost } from './toggleLikePost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST toggleLikePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67e68089f5c84b6bb4b3e9dd', '67e68089f5c84b6bb4b3e9df')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())