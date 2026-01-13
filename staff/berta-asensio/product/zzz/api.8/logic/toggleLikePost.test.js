import 'dotenv/config'
import { data } from '../data/index.js'
import { toggleLikePost } from './toggleLikePost.js'

const { MONGO_URL, MONGO_DBNAME } = process.env 
console.info('TEST toggleLikePost')

data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67e8ea9172e445b1b8f6b5e3', '67e8ea9172e445b1b8f6b5e9')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

//node logic/toggleLikePost.test.js