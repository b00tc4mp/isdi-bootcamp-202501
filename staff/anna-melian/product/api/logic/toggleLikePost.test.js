import 'dotenv/config'
import { data } from '../data/index.js'
import { toggleLikePost } from './toggleLikePost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST toggleLikePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67ec4499711dacde62ff0d8a', '67ec4499711dacde62ff0d8d')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

