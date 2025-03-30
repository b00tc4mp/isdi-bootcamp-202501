import 'dotenv/config'
import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST deletePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return deletePost('67e6bbb7793f289af9b62dcd', '67e6c5e74c0005908f83bfde')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
