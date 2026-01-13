import 'dotenv/config'
import { data } from '../data/index.js'
import { toggleLikePost } from './toggleLikePost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST toggleLikePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67eceb6691373c9de47f17f8', '67ed3b115fd334fac2a64886')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())