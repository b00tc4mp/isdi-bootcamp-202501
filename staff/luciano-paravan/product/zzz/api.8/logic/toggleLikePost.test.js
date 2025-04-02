import 'dotenv/config'
import { toggleLikePost } from './toggleLikePost.js'
import { data } from '../data/index.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST toggleLikePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        let result2

        try {
            return toggleLikePost('67dc47dd0d2ad27aeb03bb5e', '67e0875ce6ab78206be79b83')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result2 is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())