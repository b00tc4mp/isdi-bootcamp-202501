import 'dotenv/config'
import { data } from '../data/index.js'
import { updatePostText } from './updatePostText.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST updatePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null
            return updatePostText('67e6bbb7793f289af9b62dcd', '67e6bbb7793f289af9b62dd2', 'alohaaaaa alo')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())