import 'dotenv/config'
import { data } from '../data/index.js'
import { toggleLikePost } from './toggleLikePost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST toggleLikePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67eb96407d44dbe08f6e91fa', '67eb9756ff07daabb9471876')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())